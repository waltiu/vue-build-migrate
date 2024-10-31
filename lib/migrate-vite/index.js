#! /usr/bin/env node
import * as p from "@clack/prompts";
import removePackage from "../../utils/removePackage.js";
import frameworkList from "../../constant/framework.js";
import packageManagerList from "../../constant/packageManager.js";
import addPackage from "../../utils/addPackage.js";
import answers from "../../constant/answers.js";
import { PACKAGING_TOOL_VITE } from "../../constant/packagingTool.js";

const start = async () => {
  answers.packagingTool = PACKAGING_TOOL_VITE;
  await p.group(
    {
      welcome: () => {
        console.clear();
        p.intro("欢迎使用构建迁移工具");
      },
      selectFramework: async () => {
        const response = await p.select({
          message: "您当前正在使用的项目框架?",
          options: frameworkList,
        });

        answers.framework = response;
      },
      selectPackageManager: async () => {
        const response = await p.select({
          message: "您当前正在使用的包管理工具?",
          options: packageManagerList,
        });

        answers.packageManager = response;
      },
      // 删除旧的打包工具相关依赖包
      deletePackage: async () => {
        const s = p.spinner();
        s.start("正在删除相关依赖...");
        await removePackage();
        s.stop("旧打包工具相关依赖已删除");
      },
      // 添加新的打包工具相关依赖包
      addPackage: async () => {
        const s = p.spinner();
        s.start("正在添加vite相关依赖配置...");
        await addPackage();
        s.stop("vite相关依赖配置已添加");
      },
      // 修改项目运行，构建，预览命令
      changeScript: async () => {
        const s = p.spinner();
        s.start("正在修改项目运行命令...");
        s.stop("项目运行命令已更改");
      },
      // 检测是否包含根html文件，如果没有则添加
      addEntryHtml: async () => {
        const s = p.spinner();
        s.start("正在添加vite相关依赖配置...");
        s.stop("vite相关依赖配置已添加");
      },
    },
    {
      onCancel: () => {
        p.cancel("打包工具迁移已取消！");
        process.exit(0);
      },
    }
  );
};
start();
