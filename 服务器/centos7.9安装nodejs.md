# centos7.9 安装 nodejs

## 1. 使用 wget 下载 Node.js 的安装包（以 Node.js 16.x 版本为例）

```shell
wget https://nodejs.org/dist/v16.14.0/node-v16.14.0-linux-x64.tar.xz
```

## 2. 解压安装包

```shell
tar -xvf node-v16.14.0-linux-x64.tar.xz
```

## 3. 将解压后的 Node.js 文件夹移动到合适的位置，例如/usr/local/lib 目录

```shell
sudo mv node-v16.14.0-linux-x64 /usr/local/lib
```

## 4. 配置环境变量

```shell
echo export PATH=$PATH:/usr/local/lib/node-v16.14.0-linux-x64/bin >> ~/.bashrc
source ~/.bashrc
```

## Q&A

### 1. centos7.9 下载文件有什么方法

当在 CentOS 上安装 Node.js 时，您可以使用 yum 或者 wget 两种方法。这里是它们的区别：

使用 yum 安装：
yum 是 CentOS 的包管理工具，它可以自动解决依赖关系并安装软件包及其依赖项。
通过使用 curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash - 命令添加 Node.js 仓库，然后使用 sudo yum install nodejs 安装 Node.js，yum 会自动下载并安装 Node.js 及其依赖项。
使用 wget 安装：
wget 是一个命令行工具，用于从网络上下载文件。
您可以使用 wget 下载 Node.js 的安装包，然后手动进行安装和配置，这需要手动解决依赖关系和安装步骤。
总的来说，使用 yum 安装 Node.js 更加方便，因为它会自动处理依赖项并进行安装。而使用 wget 需要手动处理依赖项和安装步骤，因此相对更复杂一些。

### 2. tar -xvf 是什么意思

tar -xvf 是一个用于解压缩文件的命令。在这个命令中：

-x 表示解压缩文件；
-v 表示在解压缩过程中显示详细信息，即 verbose 模式；
-f 表示指定操作的文件，后面紧跟着要解压的文件名

### 3. ~/.bashrc 是什么文件

~/.bashrc 是一个用于配置 Bash shell 的脚本文件，它位于用户的 home 目录下（通常是 /home/username）。在这个文件中，您可以设置环境变量、定义别名、添加自定义的 shell 函数等。当用户登录时，Bash shell 会自动执行 ~/.bashrc 文件中的命令，因此它通常用于配置用户的个性化环境。

如果您需要在每次登录时自动执行一些特定的命令或者设置一些环境变量，您可以将这些命令添加到 ~/.bashrc 文件中。

### 4. 我发现很多文件都是 rc 结尾，rc 是什么意思

在 Unix 和类 Unix 系统中，文件名以 ".rc" 结尾通常表示这是一个运行控制（run control）文件。这些文件通常包含了一些程序或系统组件在启动或终止时需要执行的命令或配置。

例如：

.bashrc 是 Bash shell 的运行控制文件，用于配置 Bash shell 的行为和环境变量。
.vimrc 是 Vim 编辑器的运行控制文件，用于设置编辑器的行为和个性化配置。
.gitignore 是 Git 版本控制系统的运行控制文件，用于指定要忽略的文件和目录。
这种命名惯例是为了让用户和系统管理员知道这些文件的作用，并且方便进行管理和维护。

### 5. source 是什么

source 是一个 Bash shell 命令，用于在当前 shell 环境中执行指定的脚本文件，并将其中的命令作为当前 shell 的一部分来执行。通常用于执行 shell 脚本文件或者重新加载修改过的 shell 配置文件，比如 ~/.bashrc。

例如，当您修改了 ~/.bashrc 文件并希望立即生效时，可以使用 source ~/.bashrc 命令来重新加载 .bashrc 文件，使其中的配置立即生效。
