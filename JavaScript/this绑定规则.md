# this绑定规则

每个函数的this是在调用时被绑定的，完全取决于函数的调用位置。

我们应该先找到函数的调用位置，然后再根据规则来判断，我们应该使用那一条规则。

this绑定共有4种规则

## 默认绑定

对被直接使用不带任何修饰的函数引用进行调用时，只能使用`默认绑定`，所有可以将这条规则视为无法使用其他规则时的默认规则。

考虑一下代码

```js
function foo() {
    console.log(this.a)
}

var a = 2

foo() // 2
```

函数在非严格模式下，使用默认绑定规则时，this会被绑定到全局对象。如果函数在严格模式下，则this会被绑定到`undefined`。

以下代码函数中启动了严格模式，因此this被绑定到`undefined`。

```js
function foo() {
    `use strict`
    console.log(this.a)
}

var a = 2

foo() // TypeError: Cannot read properties of undefined (reading 'a')
```

以下代码，在严格模式调用函数，当函数中没有启动严格模式，因此this被绑定到全局对象。

```js
function foo() {
    console.log(this.a)
}

var a = 2

;(function () {
  'use strict'

  foo()
})() // 2
```

## 隐式绑定

当函数引用有上下文对象时，隐式绑定规则会把函数调用中的this绑定到这个上下文对象。

```js
function foo() {
    console.log(this.a)
}


var obj1 = {
    a: 42,
    foo: foo
}

obj1.foo() // 42
```

对象属性引用链中只有上一层或者说最后一层在调用位置中起作用。

```js
function foo() {
    console.log(this.a)
}


var obj2 = {
    a: 2,
    foo: foo
}

var obj1 = {
    a: 42,
    obj2: obj2
}

obj1.obj2.foo() // 2
```

### 隐式丢失

一个常见的this绑定问题就是被隐式绑定的函数会丢失绑定对象，也就是说它会应用**默认绑定**。

思考如下代码

```js
function foo() {
    console.log(this.a)
}

let obj = {
    a: 2,
    foo: foo
}

let bar = obj.foo
var a = 'oops, global'

bar() // 'oops, global'
```

虽然`bar`是`obj.foo`的一个引用，但其实它引用的是`foo`函数本身，使用这里的`bar()`其实是一个不带任何修饰的函数调用。

一个更微妙、更常见并且更出乎意料的情况发送在传入回到函数时。

```js
function foo() {
    console.log(this.a)
}

function doFoo(fn) {
    fn() // 函数foo的调用位置
}

var obj = {
    a: 2,
    foo: foo
}

var a = 'oops global'

doFoo(obj.foo) // 'oops global'
```

参数传递其实是一种隐式赋值，因此我们传入函数时也会被隐式赋值，使用结果和上面的例子一样，`fn`其实就是`foo`。

## 显示绑定

显式绑定是指我们通过`call`、`apply`以及`bind`方法改变this的行为，相比隐式绑定，我们能清楚的感知 this 指向变化过程。

```js
let obj1 = {
    name: '听风是风'
};
let obj2 = {
    name: '时间跳跃'
};
let obj3 = {
    name: 'echo'
}
var name = '行星飞行';

function fn() {
    console.log(this.name);
};
fn(); //行星飞行
fn.call(obj1); //听风是风
fn.apply(obj2); //时间跳跃
fn.bind(obj3)(); //echo
```

比如在上述代码中，我们分别通过call、apply、bind改变了函数fn的this指向。

在js中，当我们调用一个函数时，我们习惯称之为函数调用，函数处于一个被动的状态；而call与apply让函数从被动变主动，函数能主动选择自己的上下文，所以这种写法我们又称之为函数应用。

注意，如果在使用call之类的方法改变this指向时，指向参数提供的是null或者undefined，那么 this 将指向全局对象。

### call、apply与bind有什么区别？

1.`call`、`apply`与`bind`都用于改变this绑定，但`call`、apply在改变this指向的同时还会执行函数，而`bind`在改变this后是返回一个全新的boundFcuntion绑定函数，这也是为什么上方例子中`bind`后还加了一对括号 ()的原因。

2.`bind`属于硬绑定，返回的 boundFunction 的 this 指向无法再次通过`bind`、apply或 `call` 修改；`call`与`apply`的绑定只适用当前调用，调用完就没了，下次要用还得再次绑。

3.`call`与`apply`功能完全相同，唯一不同的是`call`方法传递函数调用形参是以散列形式，而`apply`方法的形参是一个数组。在传参的情况下，`call`的性能要高于`apply`，因为`apply`在执行时还要多一步解析数组。

区别2参考如下代码：

```js
let obj1 = {
    name: '听风是风'
};
let obj2 = {
    name: '时间跳跃'
};
var name = '行星飞行';

function fn() {
    console.log(this.name);
};
fn.call(obj1); //听风是风
fn(); //行星飞行
fn.apply(obj2); //时间跳跃
fn(); //行星飞行
let boundFn = fn.bind(obj1);//听风是风
boundFn.call(obj2);//听风是风
boundFn.apply(obj2);//听风是风
boundFn.bind(obj2)();//听风是风
```

## new绑定

准确来说，js中的构造函数只是使用`new` 调用的普通函数，它并不是一个类，最终返回的对象也不是一个实例，只是为了便于理解习惯这么说罢了。

使用`new`来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。

1. 创建一个全新的对象。
2. 这个新对象会被执行`[[Prototype]]`链接。
3. 这个新对象会绑定到函数调用的this。
4. 如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象。

```js
function foo(a) {
    this.a = a
}

var bar = new foo(2)
bar.a // 2
```

参考内容

* [博客园博客]('https://www.cnblogs.com/echolun/p/11962610.html')

下一篇：[this规则优先级](./this%E8%A7%84%E5%88%99%E4%BC%98%E5%85%88%E7%BA%A7.md)
