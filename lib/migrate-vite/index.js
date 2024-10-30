#! /usr/bin/env node
import * as p from "@clack/prompts";
import removePackage  from "../../utils/removePackage.js";
const start = async () => {
  await p.group(
    {
      welcome: () => {
        // console.clear();
        p.intro("欢迎使用构建迁移工具");
      },
      // 删除旧的打包工具相关依赖包
      deletePackage: async () => {
        const s = p.spinner();
        s.start("正在删除相关依赖...");
        // removePackage();
        s.stop("旧打包工具相关依赖已删除");
      },
      // 添加新的打包工具相关依赖包
      addPackage: async () => {
        const s = p.spinner();
        s.start("正在添加vite相关依赖配置...");
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