# Object.prototype.xxx.call

## 原因

在看webpack打包后的开发代码时。看到一下函数

```js
webpack_require.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
```

于是我就在想为什么不直接用obj.hasOwnProperty(prop)来做判断呢。

## 答案

使用Object.prototype.hasOwnProperty.call(obj, prop)而不是obj.hasOwnProperty(prop)的原因是为了避免可能出现的问题，即hasOwnProperty方法在对象的原型链中被重写或修改。

通过使用Object.prototype.hasOwnProperty.call(obj, prop)，我们确保直接从Object.prototype调用hasOwnProperty方法，而不依赖于对象的原型链中可能的修改或重写。

这种方法提供了一种更可靠和稳健的方式来检查对象中属性的存在性。

至于Object.prototype为什么不能被修改，我的猜测是因为这个原型对象是在运行时创建的，而不是在编译时创建的。并且Object.prototype是一个不可枚举的属性，因此不能被枚举。
