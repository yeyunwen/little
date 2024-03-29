import fs from "node:fs";
import path from "node:path";
import { ROOT_PATH, dirList, getFirstFileName } from "./shared";
import { type DefaultTheme } from "vitepress";

const generateNav = (): DefaultTheme.NavItem[] => {
  const nav: DefaultTheme.NavItem[] = [];

  dirList.forEach((dirName) => {
    const direntList: fs.Dirent[] = fs.readdirSync(
      path.join(ROOT_PATH, dirName),
      {
        withFileTypes: true,
      }
    );

    const firstFile = direntList[0];

    if (!firstFile.isDirectory()) {
      nav.push(generateNavItemWithLink(dirName, firstFile));
    } else {
      const navItem: DefaultTheme.NavItemWithChildren = {
        text: dirName,
        items: [],
      };
      for (const item of direntList) {
        navItem.items.push({
          text: item.name,
          link: `/${dirName}/${item.name}/${getFirstFileName(
            path.join(ROOT_PATH, dirName, item.name)
          ).replace(".md", "")}`,
        });
      }
      nav.push(navItem);
    }
  });

  return nav;
};

const generateNavItemWithLink = (
  dirName: string,
  item: fs.Dirent
): DefaultTheme.NavItemWithLink => {
  return {
    text: dirName,
    link: `/${dirName}/${item.name.replace(".md", "")}`,
    activeMatch: `/${dirName}/`,
  };
};

const customSort = [
  "JavaScript",
  "TypeScript",
  "NodeJs",
  "Npm",
  "Bug",
  "Interview",
  "服务器",
  "规范化",
  "构建工具",
  "其他",
];

const generateNavWithCustomSort = (
  nav: DefaultTheme.NavItem[]
): DefaultTheme.NavItem[] => {
  const sortNav: DefaultTheme.NavItem[] = [];
  customSort.forEach((item) => {
    sortNav.push(nav.find((i) => i.text === item) as DefaultTheme.NavItem);
  });
  return sortNav;
};

export const nav = generateNavWithCustomSort(generateNav());
