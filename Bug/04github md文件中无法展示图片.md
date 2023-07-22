# github md文件中无法展示图片

原因是被墙了

具体原因参考这篇博客: [CSDN博主「Rg4sun」的原创文章](https://blog.csdn.net/qq_41709370/article/details/106282229)。

具体解决方法
windows用户在 C:\Windows\System32\drivers\etc 目录下找到hosts文件加入以下内容：

```txt
# github

199.232.68.133 raw.githubusercontent.com
199.232.68.133 githubusercontent.com
```

但是这也仅仅只是解决了你电脑不能访问图片的问题，在别人依旧无法访问图片。

## 最终采用方案

我在gitee上新建了个项目用于存放图片，提供图片的url地址来提供图片显示。

注意:
> 图片在./raw路径下。
