import {  getDirFiles, getFile } from "./file.js";

const getFileContent = async (file,directoryPath) => {
  const content = await getFile(file, "");
  return {
    [file.replace(directoryPath,'')]: content,
  };
};

const addTemplateFile = async (packagingTool) => {
  const {filePaths,directoryPath,} = await getDirFiles("", `../template/${packagingTool}`);
  const fileContentMap =await Promise.all(filePaths.map(item=>getFileContent(item,directoryPath)))
  console.log(fileContentMap,'fileContentMap')
};
export default addTemplateFile;
