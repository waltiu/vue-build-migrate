import { getFile, saveFile } from "./file.js";

const removePackageKeys = ["vite", "webpack", "@vue/cli"];

const removeDependencies = (dependencies) => {
  const newDependencies = {};
  Object.entries(dependencies).forEach(([key, version]) => {
    if (!removePackageKeys.some((item) => key.includes(item))) {
      newDependencies[key] = version;
    }
  });
  return newDependencies;
};

export const removePackage = async () => {
  const file = await getFile("package.json");
  const fileJson = JSON.parse(file);
  fileJson.dependencies = removeDependencies(fileJson.dependencies || {});
  fileJson.devDependencies = removeDependencies(fileJson.devDependencies || {});
  return await saveFile("package.json", JSON.stringify(fileJson, null, 2));
};

export default removePackage;
