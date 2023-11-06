# 初始化一个git项目

## git init

第一步通过 `git init` 命令在本地初始化一个git仓库

## .gitignore

第二步在 `.gitignore` 文件中添加要忽略的文件

## git add .

第三步通过 `git add .` 命令将文件添加到git仓库

## git commit -m "init"

第四步通过 `git commit -m "init"` 命令提交文件, `init` 为提交的说明, 该命令将文件提交到本地仓库。

## git branch -M main

第五步通过 `git branch -M main` 命令将主分支设置为 `main`。 -M 表示将主分支设置为 `main`。

> git init 默认生成的分支是 master。

在早期的 Git 版本中，默认的主分支名是 master，但是随着时间的推移，一些人开始呼吁将默认分支的名称改为 main，以更好地反映主分支的作用。然而，为了保持向后兼容性，Git 仍然默认使用 master 作为主分支的名称。

如果你希望在初始化 Git 仓库时使用 main 作为默认分支，你可以通过设置 init.defaultBranch 配置来实现。例如，在 Unix/Linux 系统上，你可以使用以下命令：

```bash
git config --global init.defaultBranch main
```
## git remote add origin <url>

第六步通过 `git remote add origin <url>` 命令添加远程仓库。

## git push -u origin main

第七步通过 `git push -u origin main` 命令将本地仓库推送到远程仓库。 -u 表示将本地仓库和远程仓库关联起来。 orgin 表示本地仓库，main 表示远程仓库。
第一次push如果不使用-u参数，会出现可能如下错误：

```
The current branch main has no upstream branch.
```
