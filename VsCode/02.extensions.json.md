# extensions.json

将插件添加到该项目的推荐列表中

如：右击eslint插件 > 选择“添加到工作区建议”就会生成的 extensions.json 文件：

```json
{
    "recommendations": [
        "dbaeumer.vscode-eslint"
    ]
}
```

这样别人在打开我们的项目时，就可以在插件市场中输入`@recommended`来查看我们项目推荐的插件。
