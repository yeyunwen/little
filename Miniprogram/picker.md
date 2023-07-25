# picker

从底部弹起的滚动选择器。
缺点：没办法修改滚动选择器的样式。

## 普通选择器：mode = selector

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| range | array/object array | [] | mode 为 selector 或 multiSelector 时，range 有效 |
| range-key | string |  | 当 range 是一个 Object Array 时，通过 range-key 来指定 Object 中 key 的值作为选择器显示内容 |
| value | number | 0 | 表示选择了 range 中的第几个（下标从 0 开始） |
| bindchange |  | eventhandle | value 改变时触发 change 事件，event.detail = {value} |

```wxml
<!-- // 虽然不设置value 也会有默认从0开始的索引，但是它的目的主要是通过一个“index”变量来迭代range数组中的值 -->
<picker mode="selector" range="{{ typeData }}" range-key="{{ 'type' }}" value="{{ index }}" bindchange="typeChange">
    <view>{{ typeData[index].type }}</view>
</picker>
```

```js
...
data: {
  typeData: [
    { type: 'a', id: '01' },
    { type: 'b', id: '02' },
    { type: 'c', id: '03' },
    { type: 'd', id: '04' },
  ],
  index: 0 
},
typeChange(e) {
  console.log(e);
  let index = e.detail.value // value 类型是 string
  let typeId = ''
  this.setData({ index })

  typeId = this.data.typeData[index].id
  console.log(typeId)
},
```
