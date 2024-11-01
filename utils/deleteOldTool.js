import { DEPENDENCIES_CONFIG_FILE_PATH } from "../constant/filePath.js";
import { getFile, removeFile, saveFile } from "./file.js";

// 待删除的依赖
const DEPENDENCIES_KEYS = ["vite", "webpack", "@vue/cli"];
// 待删除的文件
const FILES_PATH = ["vue.config.js", "test/c.ts"];

const removeDependencies = (dependencies) => {
  const newDependencies = {};
  Object.entries(dependencies).forEach(([key, version]) => {
    if (!DEPENDENCIES_KEYS.some((item) => key.includes(item))) {
      newDependencies[key] = version;
    }
  });
  return newDependencies;
};

const removeFiles = async () => {
  return Promise.all(FILES_PATH.map((item) => removeFile(item)));
};

const deleteOldTool = async () => {
  try {
    const file = await getFile(DEPENDENCIES_CONFIG_FILE_PATH);
    const fileJson = JSON.parse(file);
    fileJson.dependencies = removeDependencies(fileJson.dependencies || {});
    fileJson.devDependencies = removeDependencies(
      fileJson.devDependencies || {}
    );
    await saveFile(
      DEPENDENCIES_CONFIG_FILE_PATH,
      JSON.stringify(fileJson, null, 2)
    );
    await removeFiles();
  } catch (error) {
  }
};

export default deleteOldTool;
