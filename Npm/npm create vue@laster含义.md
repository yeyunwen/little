# npm create vue@laster含义

## npm create 命令

`create` 命令其实是 `init` 初始化命令的一个 `alias` （别名）。

描述：

`npm init <initializer>` 可用于设置新的或现有的 npm 包。
在这种情况下，`initializer` 是一个名为 `create-<initializer>` 的 npm 包，它将由 [npm-exec](https://npm.nodejs.cn/cli/v10/commands/npm-exec) 安装，然后执行其主 bin —— 大概是创建或更新。

官网（中文）地址: [npm init](https://npm.nodejs.cn/cli/v10/commands/npm-init)

## 总结

`npm create vue@laster` 命令其实就是 `npm init create-vue@laster` 命令。通过`npm exec` 在npm上下载 名为 `create-vue` 版本为 `latest` 的包，并执行 它的 `package.json` 中 `bin` 属性的命令。