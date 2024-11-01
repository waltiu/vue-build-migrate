import answers from "../constant/answers.js";
import { PACKAGING_TOOL_VITE } from "../constant/packagingTool.js";
import addTemplateFile from "./addTemplateFile.js";

const addPackage = async () => {
  try {
    const packagingTool = answers.packagingTool;
    let dependenceNames = [];
    if (packagingTool === PACKAGING_TOOL_VITE) {
      dependenceNames = ["vite", "@vitejs/plugin-vue"];
    }
    // await installDependence(dependenceNames.join(" "));
    await addTemplateFile(packagingTool);
  } catch (error) {
    console.log(error);
  }
};

export default addPackage;
