import path from "node:path";
import fs from "node:fs";
import { log } from "node:console";
import { ROOT_PATH, dirList } from "./shared";
import { type DefaultTheme } from "vitepress";

log(dirList);

const generateSidebar = (): DefaultTheme.Sidebar => {
  const sidebar: DefaultTheme.Sidebar = {};

  dirList.forEach((dirName) => {
    const direntList: fs.Dirent[] = fs.readdirSync(
      path.join(ROOT_PATH, dirName),
      {
        withFileTypes: true,
      }
    );
    const firstFile = direntList[0];

    if (!firstFile.isDirectory()) {
      sidebar[`/${dirName}/`] = {
        base: `/${dirName}/`,
        items: generateSidebarItems(path.join(ROOT_PATH, dirName)),
      };
    } else {
      for (const item of direntList) {
        sidebar[`/${dirName}/${item.name}/`] = {
          base: `/${dirName}/${item.name}/`,
          items: generateSidebarItems(path.join(ROOT_PATH, dirName, item.name)),
        };
      }
    }
  });

  return sidebar;
};

const generateSidebarItems = (dirPath: string): DefaultTheme.SidebarItem[] => {
  const fileList = fs.readdirSync(dirPath);
  const filteredFileList = filterIgnoreFile(fileList);

  return filteredFileList.map((fileName) => {
    const text = fileName.replace(".md", "");
    return {
      text,
      link: text,
    };
  });
};

// 过滤文件
const filterIgnoreFile = (fileList: string[]): string[] => {
  const IGNORE_FILE_TYPE = [".png"];
  return fileList.filter((item) => {
    return !IGNORE_FILE_TYPE.some((type) => {
      return item.endsWith(type);
    });
  });
};

export const sidebar = generateSidebar();
