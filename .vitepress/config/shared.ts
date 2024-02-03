import fs from "node:fs";

const ROOT_PATH = process.cwd();
const IGNORE_DIR = [
  "node_modules",
  ".idea",
  ".github",
  ".vitepress",
  ".vscode",
  ".git",
  "public",
  "Miniprogram",
  "Vue",
];

const getDirList = (dirPath: string) => {
  return fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((item) => {
      if (IGNORE_DIR.includes(item.name)) {
        return false;
      }
      return item.isDirectory();
    })
    .map((item) => item.name);
};

const getFirstFileName = (dirPath: string) => {
  return fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((item) => {
      if (IGNORE_DIR.includes(item.name)) {
        return false;
      }
      return item.isFile();
    })
    .map((item) => item.name)[0];
};

const dirList = getDirList(ROOT_PATH);

export { ROOT_PATH, IGNORE_DIR, dirList, getDirList, getFirstFileName };
