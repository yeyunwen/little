# 对this了解不全面而引发的问题

## 起因

在学习对象属性中的访问器属性时，其中有个案例如下：

```js
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  }
};

user.fullNme // John Smith
```

我在想能不能写成以下代码：

```js
let user = {
  name: "John",
  surname: "Smith",
  fullname: this.firstname + this.lastname
}

person.fullname // NaN
```

运行结果是`NaN`，为什么？

造成这个运行结果原因：

1. 代码运行在全局作用域下，此时this指向windows对象（浏览器环境下），而windows对象上目前没有`firstname`和`lastname`属性。
2. `this.firstname`和`this.lastname`的值均为`undefined`。
3. 在进行`+`运算前，会自动对值进行`number`类型转换类型转换。
4. `undefined`转换后的值为`NaN`,`NaN`加任何数都是`NaN`。

那么造成我写出这个代码的原因是什么？就是我对`this`的了解还不够全面。

因此我有三个问题：

1. this是怎么产生的？
2. 为什么需要this？
3. this是什么？

## 问题

### this是怎么产生的？

当一个函数被执行的时候，会建立一个称为执行上下文（或执行环境）的活动记录。这个记录包含函数是从何处（调用栈——call-stack）调用的，函数是如何被调用的，被传递了什么参数等信息。<u>这个记录的属性之一，就是在函数执行期间将被使用的`this`引用。</u>

对我而言，这又引发了一个新的问题：**什么是执行上下文？**
其实在写js代码的时候还有一个前置问题需要解决：**那就是js代码在运行之后会发生什么？** 关于这个问题可以阅读这篇文章[Js引擎](Js引擎.md)

#### 执行上下文

执行上下文（Exection context, EC）或执行环境分为3种

1. 全局执行上下文
2. 函数执行上下文
3. eval执行上下文

> js为每一个执行上下文关联了一个变量对象。上下文中的变量，函数都保存在这个对象中。

当js代码执行的时候会进入不同的执行上下文，这些执行上下文会构成了一个执行上下文栈（Execution Context Stack， ECS）。

一个简单的例子：

```js
function bar() {
  let num = 1
  console.log('bar num: ', num)
}
function foo() {
  let num = 2
  bar()
  console.log('foo num: ', num)
}

foo()
```

上述例子的执行栈变化图如下：

![执行栈变化图](https://gitee.com/ye-yunwen/images/raw/master/执行栈.png)

### 执行上下文的内容

执行上下文是一个抽象的概念，我们可以把它理解为一个`object`，一个执行上下文里包含如下内容：

1. 变量对象
2. 活动对象
3. 作用域链
4. 调用者信息this

#### 变量对象（variable object， VO）

每个执行上下文都有一个表示变量的对象——**变量对象**，全局执行环境的变量对象始终存在，而函数这样局部环境的变量，只会在函数执行的过程中存在，在函数被调用时且在具体的函数代码运行之前，JS 引擎会用当前函数的参数列表（arguments）初始化一个 “变量对象” 并将当前执行上下文与之关联 ，函数代码块中声明的 **变量** 和 **函数** 将作为属性添加到这个变量对象上。

> 全局执行上下文和函数执行上下文中的变量对象还略有不同，它们之间的差别简单来说:
全局上下文中的变量对象就是全局对象，以浏览器环境来说，就是 window 对象。
函数执行上下文中的变量对象内部定义的属性，是不能被直接访问的，只有当函数被调用时，变量对象（VO）被激活为活动对象（AO）时，我们才能访问到其中的属性和方法。

#### 活动对象（activation object 简称 AO）

函数进入执行阶段时，原本不能访问的变量对象被激活成为一个活动对象，自此，我们可以访问到其中的各种属性。

其实变量对象和活动对象是一个东西，只不过处于不同的状态和阶段而已。

#### 作用域链（scope chain）

作用域 规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级（词法层面上的父级）执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做 作用域链。
函数的作用域在函数创建时就已经确定了。当函数创建时，会有一个名为 `[[scope]]` 的内部属性保存所有父变量对象到其中。当函数执行时，会创建一个执行环境，然后通过复制函数的 `[[scope]]` 属性中的对象构建起执行环境的作用域链，然后，变量对象 VO 被激活生成 AO 并添加到作用域链的前端，完整作用域链创建完成：

伪代码:
`Scope = [AO].concat([[Scope]]);`

#### 当前可执行代码块的调用者（this）

如果当前函数被作为对象方法调用或使用 bind call apply 等 API 进行委托调用，则将当前代码块的调用者信息（this value）存入当前执行上下文，否则默认为全局对象调用。

执行上下文数据结构模拟

如果将上述一个完整的执行上下文使用代码形式表现出来的话，应该类似于下面这种：

```js
executionContext：{
 [variable object | activation object]：{
        arguments,
        variables: [...],
        funcions: [...]
 },
    scope chain: variable object + all parents scopes
    thisValue: context object
}
```

## 回答问题

在了解了上下文的概念后，我们可以回答一开始提出的3个提问。

问：1.this是怎么产生的？
回答：在js中，代码运行时，会进入不同的执行上下文，这些执行上下文会构成了一个执行上下文栈，一个执行上下文里包含如下内容：

1. 变量对象
2. 活动对象
3. 作用域链
4. 调用者信息this

执行上下文有一个与之关联的**变量对象**，当中存放这当前执行上下文的变量和函数。变量对象是无法访问等，只有当引擎进入当前执行上下文栈时，变量对象会被激活成**活动对象**，自此，我们可以访问到其中的各种属性。当函数创建（函数执行上下文）时，会有一个名为`[[scope]]`的内部属性，保存所有父变量对象到其中。当函数执行时，会创建一个执行环境，然后通过复制函数的 `[[scope]]` 属性中的对象构建起执行环境的作用域链。如果当前函数被作为对象方法调用或使用 bind call apply 等 API 进行委托调用，则将当前代码块的调用者信息（this value）存入当前执行上下文，否则默认为全局对象调用。
所以this是在一个执行上下文中产生的，用来表示当前执行上下文中的调用者信息，这又就是为什么js中的this是在调用时被绑定的，完全取决于函数的调用位置的原因。

问：2.为什么需要this？
回答：this 机制提供了更优雅的方式来隐含地“传递”一个对象引用，导致更加干净的API设计和更容易的复用。

你的使用模式越复杂，你就会越清晰地看到：将执行环境作为一个明确参数传递，通常比传递 this 执行环境要乱。当我们探索对象和原型时，你将会看到一组可以自动引用恰当执行环境对象的函数是多么有用。

问：3. this是什么？
回答：现在这个问题就很好回答了，this是一个执行上下文创建时，用来表示当前执行上下文中的调用者信息一个引用值。

## 再看一遍开头代码的运行过程

```js
let user = {
  name: "John",
  surname: "Smith",
  fullname: this.firstname + this.lastname
}

person.fullname // NaN
```

首先我们要知道的是执行上下文有3种，全局、函数、eval执行上下文。`user`是一个对象，并没有创建执行上下文,所以代码中的执行上下文栈中，只有一个执行上下文，也就是全局执行上下文。

此时的this其实就是全局执行上下文在创建时产生的，变量的访问规则是作用域，作用域指向的是当前的变量对象，而全局执行上下文的变量对象就是全局对象（在浏览器环境下时window对象），window对象中没有firstname和lastname属性。

这其实也解释了，为什么this默认指向的是全局对象。

参考博客：

* [面试官：那我们来说说执行上下文吧](https://zhuanlan.zhihu.com/p/141582658)
