# text-align

有时候一段文字没有填满整行内容就发生了换行。

```html
<!-- html -->
<div class="text">
    好论决败言郭什临斯他德，落牛意，廿意弟恼落一命与天卅变鼓元烦掸人，言承念不举用陀回动地就陀韩，百的光目友整不他回不皇畴才，有其因更临留着极洪连褒慧皇仄德，三予婵李若策生一了一，喜也败畴火别生，位到然。
</div>
```

```css
/* css */
.text {
  width: 200px;
  border: 1px solid #f7d;
}
```

效果如图

![text-align](https://gitee.com/ye-yunwen/images/raw/master/text-align01.png)

此时可以在文本的父容器中设置`text-align`属性来控制文本的对齐方式

```css
/* css */
.text {
  width: 200px;
  text-align: justify; /* 添加的样式 */
  border: 1px solid #f7d;
}
```

效果如图

![text-align](https://gitee.com/ye-yunwen/images/raw/master/text-align02.png)