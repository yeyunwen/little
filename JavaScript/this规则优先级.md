# this规则优先级

我们已经了解了函数调用中this绑定的四条规则。你需要做的就是找到函数的调用位置并判断应当应用哪条规则。但是，如果某个调用位置可以应用多条规则该怎么吗？这就涉及到了规则的优先级。

可以按照以下顺序进行判断：

1. 函数是否在new中调用(new 绑定)？如果是的话this绑定的就是新创建的对象。
  `var bar = new foo()`
2. 函数是否通过call、apply(显示绑定)或者硬绑定(bind)调用？如果是的话，this绑定的是指定的对象。
  `var bar = foo.call(obj)`
3. 函数是否在某个上下文对象中调用(隐式绑定)？如果是的话，this绑定的是那个上下文对象。
  `var bar = obj1.foo()`
4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到`undefined`，否则绑定到全局对象。
  `var bar = foo()`

## 显示绑定 > 隐性绑定

```js
function foo() {
    console.log(this.a)
}

var obj1 = {
    a: 2,
    foo: foo
}

var obj2 = {
    a: 3,
    foo: foo
}

obj1.foo() // 2
obj2.foo() // 3

obj1.foo.call(obj2) // 3
obj2.foo.call(obj1) // 2
```

## new绑定 > 隐式绑定

```js
function foo(something) {
    this.a = something
}

var obj1 = {
    foo: foo
}

var obj2 = {}

obj1.foo(2) // obj1 { a: 2, foo: foo }

obj1.foo.call(obj2, 3) // obj2 { a: 3 }

var bar = new obj1.foo(4) // bar { a: 4 }
```

## new绑定 > 显示绑定

```js
function foo(something) {
    this.a = something
}

var obj1 = {}

var bar = foo.bind(obj1)

bar(2) // obj1 { a: 2 }

var baz = new bar(3) // baz { a: 3 }
```
