#! /usr/bin/env node
import * as p from "@clack/prompts";
import frameworkList from "../../constant/framework.js";
import packageManagerList from "../../constant/packageManager.js";
import answers from "../../constant/answers.js";
import { PACKAGING_TOOL_VITE } from "../../constant/packagingTool.js";
import addNewTool from "../../utils/addNewTool.js";
import deleteOldTool from '../../utils/deleteOldTool.js'
import changeScript from "../../utils/changeScript.js";
import { deleteCache, startProject } from "../../utils/startProject.js";

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
      deleteOldTool: async () => {
        const s = p.spinner();
        s.start("正在删除旧打包工具相关内容...");
        await deleteOldTool();
        s.stop("旧打包工具相关相关已删除！");
      },
      // 添加新的打包工具相关依赖包
      addNewTool: async () => {
        const s = p.spinner();
        s.start("正在添加新打包工具相关内容...");
        await addNewTool();
        s.stop("新打包工具相关内容已添加！");
      },
      // 修改项目运行，构建，预览命令
      changeScript: async () => {
        const s = p.spinner();
        s.start("正在修改项目运行命令...");
        await changeScript()
        s.stop("项目运行命令已更改");
      },
      // 删除旧包缓存，开始安装依赖并执行dev命令
      startProject: async () => {
        const s = p.spinner();
        s.start("正在清除node_modules缓存...");
        await deleteCache()
        s.stop("node_modules缓存已清除，准备启动项目！");
        startProject('dev')
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
