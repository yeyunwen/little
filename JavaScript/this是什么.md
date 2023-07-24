# this

## this是什么

this 它代表函数运行时，自动生成的一个内部对象，只能在函数内部使用。
所以this只存在于函数之中。

this 不是编写时绑定，而是运行时绑定。它依赖于函数调用的上下文条件。this 绑定与函数声明的位置没有任何关系，而与函数被调用的方式紧密相连。

当一个函数被调用时，会建立一个称为执行环境的活动记录。这个记录包含函数是从何处（调用栈 —— call-stack）被调用的，函数是 如何 被调用的，被传递了什么参数等信息。这个记录的属性之一，就是在函数执行期间将被使用的 this 引用。

## 为什么需要this

如果对于那些老练的 JavaScript 开发者来说 this 机制都是如此的令人费解，那么有人会问为什么这种机制会有用？它带来的麻烦不是比好处多吗？在讲解 如何 有用之前，我们应当先来看看 为什么 有用。

让我们试着展示一下 this 的动机和用途：

```js
function identify() {
  return this.name.toUpperCase();
}

function speak() {
  var greeting = "Hello, I'm " + identify.call( this );
  console.log( greeting );
}

var me = {
  name: "Kyle"
};

var you = {
  name: "Reader"
};

identify.call( me ); // KYLE
identify.call( you ); // READER

speak.call( me ); // Hello, I'm KYLE
speak.call( you ); // Hello, I'm READER
```

如果这个代码段 如何 工作让你困惑，不要担心！我们很快就会讲解它。只是简要地将这些问题放在旁边，以便于我们可以更清晰的探究 为什么。

这个代码片段允许 identify() 和 speak() 函数对多个 环境 对象（me 和 you）进行复用，而不是针对每个对象定义函数的分离版本。

与使用 this 相反地，你可以明确地将环境对象传递给 identify() 和 speak()。

```js
function identify(context) {
 return context.name.toUpperCase();
}

function speak(context) {
 var greeting = "Hello, I'm " + identify( context );
 console.log( greeting );
}

identify( you ); // READER
speak( me ); // Hello, I'm KYLE
```

然而，this 机制提供了更优雅的方式来隐含地“传递”一个对象引用，导致更加干净的API设计和更容易的复用。

你的使用模式越复杂，你就会越清晰地看到：将执行环境作为一个明确参数传递，通常比传递 this 执行环境要乱。当我们探索对象和原型时，你将会看到一组可以自动引用恰当执行环境对象的函数是多么有用。
