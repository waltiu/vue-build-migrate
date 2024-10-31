import { exec, execSync } from "child_process";
import answers from "../constant/answers.js";
import {
  PACKAGE_MANAGER_NPM,
  PACKAGE_MANAGER_PNPM,
  PACKAGE_MANAGER_YARN,
} from "../constant/packageManager.js";

const installDependence = (dependenceName) => {
  return new Promise((resolve, reject) => {
    const packageManager = answers.packageManager;
    let command = "";
    if (packageManager === PACKAGE_MANAGER_NPM) {
      command = "npm add -D ";
    } else if (packageManager === PACKAGE_MANAGER_PNPM) {
      command = "pnpm add -D ";
    } else if (packageManager === PACKAGE_MANAGER_YARN) {
      command = "yarn add -D ";
    }
    console.log(command, dependenceName);
    if (!dependenceName || !command) {
      reject("");
    }
    try {
      exec(`${command}${dependenceName}`, (error) => {
        console.log(error,'error')
        if(!error){
          resolve()
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

export default installDependence;
