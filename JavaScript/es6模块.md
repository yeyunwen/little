# ES6模块

在ES6之前JavaScript在语言标准层面一直没有模块化的支持。这对开发大型的、复杂的项目形成了巨大障碍。

社区制定了一些模块加载方案，最主要的有 CommonJS（同步） 和 AMD （异步）两种。前者用于服务器（服务端没有网络问题的影响），后者用于浏览器（浏览器可能受网络的影响，如果网络不好，加载一个文件会花费很多多时间，导致页面假死，使用要异步的方式）。ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。

ES6模块的设计是尽量的静态化，这使得程序可以在静态编译时确定模块的依赖关系、输入输出变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。

## export 命令

模块功能主要由两个命令构成：export和import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。

export导出主要有2种方式:

1.命名导出（每个模块包含任意数量）
2.默认导出（每个模块包含一个）

```js
// 1.命名导出

// 单个导出
export let name = 'cloudhot'
export let year = '2002'
export let age = '21'
export function foo() {...}
export class ClassName {...}

// 多个导出
export { 
  name,
  year,
  age,
  foo() {
    ...
  },
  class ClassName {...}
}

// 重命名导出
export { name as username }
export const { k1, k2: newKey2} = obj

```

### export default 命令

使用import命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。但是，用户肯定希望快速上手，未必愿意阅读文档，去了解模块有哪些属性和方法。

为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到export default命令，为模块指定默认输出。

```js
// 2.默认导出

// 正确
let name = 'cloudhot'
export default name

// 错误
export default let name = 'cloudhot'
```

## import 命令

使用export命令定义了模块的对外接口以后，其他 JS 文件就可以通过import命令加载这个模块。

```js
// main.js
import { firstName, lastName, year } from './profile.js';

// 导入默认导出
import profile from './profile.js';

```

## commonJS

commonJS是服务端nodejs的模块标准,与 ES6 模块不兼容，采用同步加载的方式，因为服务端的模块(文件)都是存在磁盘里，使用可以采用同步加载的方式。

### module.exports 命令

通过module.exports 导出模块

```js
module.exports = {
  a: 1,
  b: 2
}
```

### exports 命令

也可以通过exports导出模块中的值，不过需要注意的是,**exports其实就是指向module.exports**的，因此，在使用exports时，应该只是给exports添加属性，而不是给其重新赋值，否则会修改exports的指向。

```js
exports.a = 1
exports.b = 2
```

### require 命令

通过require命令导入模块。require是动态加载的，是运行时的，也就说具体加载哪一个文件，要等运行到这一行才知道。

```js
const module = require('./someModule.js')

const fileName = 'someVaule'

if (true) {
  // 动态加载的，是运行时的体现 es6的模块不支持，因为这样无法做到静态编译
  const moudle1 = require('./${fileName}.js')
}
```

## es6模块具体的加载方法

以上只是介绍了esm（es6 模块）和 cjs（commonjs）的语法，在使用时还需添加一些配置。

### 在浏览器加载

在浏览器中，通过script标签导入es6模块文件。需要在script标签中添加属性`type="module"`,这样浏览器就知道这是一个 ES6 模块。

```js
<script type="module" src="./foo.js"></script>
```

### 在node中加载

从 Node.js v13.2 版本开始，Node.js 已经默认打开了 ES6 模块支持。

Node.js 要求 ES6 模块采用.mjs后缀文件名。也就是说，只要脚本文件里面使用import或者export命令，那么就必须采用.mjs后缀名。Node.js 遇到.mjs文件，就认为它是 ES6 模块，默认启用严格模式，不必在每个模块文件顶部指定"use strict"。

如果不希望将后缀名改成.mjs，可以在项目的package.json文件中，指定type字段为module。

## import()

前面介绍过，import命令会被 JavaScript 引擎静态分析，先于模块内的其他语句执行（import命令叫做“连接” binding 其实更合适）。所以，下面的代码会报错。

```js
// 报错
if (x === 2) {
  import MyModual from './myModual';
}
```

引擎处理import语句是在编译时，这时不会去分析或执行if语句，所以import语句放在if代码块之中毫无意义，因此会报句法错误，而不是执行时错误。也就是说，import和export命令只能在模块的顶层，不能在代码块之中（比如，在if代码块之中，或在函数之中）。

这样的设计，固然有利于编译器提高效率，但也导致无法在运行时加载模块。在语法上，条件加载就不可能实现。如果import命令要取代 Node 的require方法，这就形成了一个障碍。因为require是运行时加载模块，import命令无法取代require的动态加载功能。

`ES2020`提案 引入import()函数，支持动态加载模块。

```js
import(specifier)
```

上面代码中，import函数的参数specifier，指定所要加载的模块的位置。import命令能够接受什么参数，import()函数就能接受什么参数，两者区别主要是后者为动态加载。

import()返回一个 Promise 对象。

```js
const main = document.querySelector('main');

import(`./section-modules/${someVariable}.js`)
  .then(module => {
    module.loadPageInto(main);
  })
  .catch(err => {
    main.textContent = err.message;
  });
```

有了import() 就可以实现按需加载，条件加载，动态的模块路径。

参考内容
1. <https://es6.ruanyifeng.com/#docs/module>
2. <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export>
