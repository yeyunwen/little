# powershell无法执行命令

## 问题原因

电脑上启动 Window Powershell 时，默认情况下，其执行策略可能是Restricted。
Restricted策略是不允许任何脚本执行的。

如要查询当前执行策略 其命令

```cmd
get-executionpolicy     //查看当前执行策略
```

解决问题方案
更改执行策略 remotesigned
在Powershell中键入（最好用管理员权限执行）

```cmd
set-executionpolicy remotesigned //修改执行策略remotesigned  
```

![powershell](https://gitee.com/ye-yunwen/images/raw/master/powershell.png)

输入y即可。
