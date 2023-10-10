# Vue 中获取dom的方式

Vue实现了MVVM模型，将数据和表现进行了分离，我们只需要更新数据就能使DOM同步更新，但是某些情况下，还是需要获取DOM元素进行操作

## 1. refs

给元素添加attr:`ref="xxx"`

就可以通过this.$refs.xxx获取对应的dom。

```html
<template>
  <div ref="bar">{{ foo }}</div>
  <MyAvatar ref="avatar" />
  ...
</template>
<script>
  ...
  mounted () {
  let foo = this.$refs['bar'] // 一个dom元素
  et avatar = this.$refs['avatar'] // 一个组件实例对象
}
</script>
```

## 2. 直接操作dom

```html
<script>
  ...
  mounted() {
    let elm = this.$el.querySelector('#id')
  }
</script>
```

Vue组件在patch阶段结束时会把this.\$el赋值为挂载的根dom元素，我们可以直接使用$el的querySelector, querySelectorAll等方法获取匹配的元素。

## 3.使用自定义指令

Vue提供了自定义指令，官方文档给出了如下的使用方法，其中el就是dom元素的引用

```js
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```
