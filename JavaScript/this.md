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

参考博客：

* [面试官：那我们来说说执行上下文吧](https://zhuanlan.zhihu.com/p/141582658)
