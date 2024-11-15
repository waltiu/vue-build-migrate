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
    if (!dependenceName || !command) {
      reject("");
    }
    try {
      console.log(`${command}${dependenceName}`)
      exec(`${command}${dependenceName}`, (error,stdout) => {
        console.log(stdout,'stdout')
        console.log(error)
        if (!error) {
          resolve();
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

export default installDependence;
