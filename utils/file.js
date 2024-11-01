import * as fs from "fs";
import path, { basename } from "path";
import { fileURLToPath } from "url";

export const BASE_PATH = process.cwd() + "\\";
export const DIR_NAME = path.dirname(fileURLToPath(import.meta.url));
export async function getFile(fileName, basePath = BASE_PATH) {
  return await new Promise((resolve, reject) => {
    try {
      const file = fs.readFileSync(basePath + fileName, "utf8");
      resolve(file);
    } catch (e) {
      reject(new Error("File not found"));
    }
  });
}

export async function saveFile(fileName, fileContents) {
  return await new Promise((resolve, reject) => {
    try {
      const dirPath = BASE_PATH + fileName;
      fs.mkdirSync(path.dirname(dirPath), { recursive: true });
      fs.writeFileSync(dirPath, fileContents);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

export async function removeFile(fileName) {
  return await new Promise((resolve, reject) => {
    try {
      // check if file exists
      if (fs.existsSync(BASE_PATH + fileName)) {
        fs.unlinkSync(BASE_PATH + fileName);
        resolve();
      }else{
        reject()
      }
    } catch (e) {
      reject(e);
    }
  });
}

export async function copyFile(source, destination) {
  return await new Promise((resolve, reject) => {
    try {
      fs.copyFileSync(BASE_PATH + source, BASE_PATH + destination);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}
function getDirFilesContent(dir, filePaths = []) {
  return new Promise((resolve, reject) => {
    try {
      const files = fs.readdirSync(dir, { withFileTypes: true });
      files.forEach(async (item) => {
        const filePath = `${dir}\\${item.name}`;
        const status = fs.statSync(filePath);
        if (status.isDirectory()) {
          try {
            const paths = await getDirFilesContent(filePath, filePaths);
            filePaths = filePaths.concat(paths);
          } catch (error) {
            console.log(error, "error");
          }
        } else {
          filePaths.push(filePath);
        }
      });
      resolve(filePaths);
    } catch (error) {
      console.log(error, "error");
    }
  });
}

export async function getDirFiles(dirName, folderName) {
  return new Promise(async (resolve, reject) => {
    try {
      const directoryPath = path.join(dirName || DIR_NAME, folderName); // 替换为你的目录名
      console.log(directoryPath, "directoryPath");
      const filePaths = await getDirFilesContent(directoryPath);
      resolve({
        filePaths,
        directoryPath,
      });
    } catch (error) {
      resolve(error);
    }
  });
}
