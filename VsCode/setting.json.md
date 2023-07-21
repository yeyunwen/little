# setting.json

创建工作区设置配置文件：

进入工作区设置界面，点击任一【在setting.json中编辑】链接都会自动创建setting.json文件。

可以配置一些语言的格式化方法。比如vetur

```json
{
    // 每次保存的时候将代码按格式进行修复
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {

        "source.fixAll": true
    },
    "editor.tabSize": 4,

    // 默认使用prettier格式化支持的文件
    "vetur.completion.autoImport": false,
    "vetur.format.defaultFormatter.js": "prettier",
    "vetur.format.defaultFormatter.html": "prettyhtml",
    "vetur.format.options.tabSize": 4,
    "vetur.format.defaultFormatterOptions": {
        "js-beautify-html": {
            "wrap_attributes": "force-expand-multiline"
        }
    }
}
```
