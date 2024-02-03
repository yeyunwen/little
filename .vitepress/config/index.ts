import { defineConfig } from "vitepress";
import { nav } from "./nav";
import { sidebar } from "./sidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "little",
  description: "cloudhot的文档网站",
  ignoreDeadLinks: true, // 忽略 dead link
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo.svg",
    outlineTitle: "文章目录",
    outline: [1, 6],
    nav,
    sidebar,
    // 设置搜索框的样式
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
    footer: {
      copyright: `版权所有 © 2023-${new Date().getFullYear()} yeyunwen`,
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/yeyunwen/little" },
    ],
  },
  lastUpdated: true,
});
