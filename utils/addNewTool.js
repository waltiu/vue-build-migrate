import answers from "../constant/answers.js";
import { PACKAGING_TOOL_VITE } from "../constant/packagingTool.js";
import { getDirFiles, getFile, saveFile } from "./file.js";
import installDependence from "./installDependence.js";

const getFileContent = async (file, directoryPath) => {
  const content = await getFile(file, "");
  return {
    filePath: file.replace(directoryPath + "\\", ""),
    fileContent: content,
  };
};

const addTemplateFile = async (packagingTool) => {
  const { filePaths, directoryPath } = await getDirFiles(
    "",
    `../template/${packagingTool}/`
  );
  const fileContentList = await Promise.all(
    filePaths.map((item) => getFileContent(item, directoryPath))
  );
  return Promise.all(
    fileContentList.map((item) => saveFile(item.filePath, item.fileContent))
  );
};

const addNewTool = async () => {
  try {
    const packagingTool = answers.packagingTool;
    let dependenceNames = [];
    if (packagingTool === PACKAGING_TOOL_VITE) {
      dependenceNames = ["vite", "@vitejs/plugin-vue", "vite-plugin-dts"];
    }
    await installDependence(dependenceNames.join(" "));
    await addTemplateFile(packagingTool);
  } catch (error) {
    console.log("addNewTool", error);
  }
};

export default addNewTool;
