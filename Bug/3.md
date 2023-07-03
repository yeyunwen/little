# 使用 git 重命名文件和文件夹

## 问题

我想修改一个git管理的项目的中的一个interview的文件夹重命名为Interview。发现git并不会跟踪。

## 原因

git默认忽略大小写。

## 解决

方法1：
输入以下命令

```bash
git config core.ignorecase false
```

开启git的大小写区分。

可是这又引发了一个问题，git会认为重命名后的Interview文件夹是一个新的文件。在push时会出现，github上同时存在interview和Interview两个文件夹。而我本地的git只要Interview文件夹。

这并不是我想要的。

方法二:

```bash
git mv interview _ && git mv _ Interview
```

这将首先将文件夹重命名为完全不同的文件夹名称，从而拆分重命名过程。将其重命名为其他文件夹名称后，该文件夹最终可以重命名为新文件夹名称。在这些“git mv”之后，再次不要忘记添加和提交更改。虽然这可能不是一个美丽的技术，但它工作得很好。文件系统仍然无法识别字母大小写的更改，但 git 会识别，因为它将其重命名为新的文件夹名称，这就是我们想要的。
