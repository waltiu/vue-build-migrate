import { execSync } from "child_process";
import answers from "../constant/answers.js";
import { NODE_MODULES_CACHE_FILE_PATH } from "../constant/filePath";
import {
  PACKAGE_MANAGER_PNPM,
  PACKAGE_MANAGER_YARN,
} from "../constant/packageManager";
import { removeFile } from "./file";

export const deleteCache = async () => {
  await removeFile(NODE_MODULES_CACHE_FILE_PATH);
  const packageManager = answers.packageManager;
  let command = "npm install";
  if (packageManager === PACKAGE_MANAGER_PNPM) {
    command = "pnpm install ";
  } else if (packageManager === PACKAGE_MANAGER_YARN) {
    command = "yarn";
  }
  execSync(`${command}`, {});
};

export const startProject = (command) => {
  execSync(`npm run ${command || "dev"}`, {});
};
