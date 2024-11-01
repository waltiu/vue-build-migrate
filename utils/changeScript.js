import answers from "../constant/answers.js";
import { DEPENDENCIES_CONFIG_FILE_PATH } from "../constant/filePath.js";
import { PACKAGING_TOOL_VITE } from "../constant/packagingTool.js";
import { getFile, saveFile } from "./file.js";

const scriptsMap = {
  [PACKAGING_TOOL_VITE]: {
    dev: "vite",
    build: "vue-tsc -b && vite build",
    preview: "vite preview",
  },
};

const changeScript = async () => {
  try {
    const packagingTool = answers.packagingTool;
    const file = await getFile(DEPENDENCIES_CONFIG_FILE_PATH);
    const fileJson = JSON.parse(file);
    fileJson.scripts = {
      ...(fileJson.scripts || {}),
      ...(scriptsMap[packagingTool] || {}),
    };
    await saveFile(
      DEPENDENCIES_CONFIG_FILE_PATH,
      JSON.stringify(fileJson, null, 2)
    );
  } catch (error) {
    console.log("changeScript", error);
  }
};

export default changeScript;
