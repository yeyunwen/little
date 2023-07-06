# nvm

nvm是一个nodejs版本管理工具，可以下载多个版本的nodejs并切换。

Windows安装地址: <https://github.com/coreybutler/nvm-windows/releases>

>安装路径最好不要有中文和空格，切换版本失败可以尝试以管理员的身份允许cmd

## nvm和nodejs文件夹

安装时需要指定nvm的下载位置和nodejs的下载位置。

通过nvm下载了16.14.1版本的node后，会在nvm的文件夹下多出一个v16.14.1的文件夹，这就是对应node的文件。

nodejs文件夹其实是当前选择的node版本文件夹的一个快捷方式。
如果当前使用的node版本是16.14.1，则nodejs文件夹就是nvm目录中v16.14.1文件夹的一个快捷方式。

## 查看已经node版本列表

`nvm ls`

## 切换node版本

`nvm use x.x.x`

通过nvm切换node版本的同时也会切换对应的npm版本。

## 设置npm全局下载包的位置

`npm config set prefix "路径"`

同时需要将该路径添加到系统的环境变量中。

配置好后可以通过如下命令查看：

* `npm root -g` 查看全局下载包的位置
* `npm config ls` 查看npm配置信息

## 查看npm下载的包

* `npm list` 查看默认下载的包
* `npm list -g` 查看全局下载的包
