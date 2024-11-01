import { getDirFiles, getFile, saveFile } from "./file.js";

const getFileContent = async (file, directoryPath) => {
  const content = await getFile(file, "");
  return {
    filePath:file.replace(directoryPath+"\\", ""),
    fileContent:content
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
  await Promise.all(fileContentList.map(item=>saveFile(item.filePath,item.fileContent)))
  
};
export default addTemplateFile;
