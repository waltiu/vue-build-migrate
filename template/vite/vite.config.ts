import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve:{
    alias:{
        '@': resolve(__dirname, 'src')
    }
  },
  plugins: [vue()],
  server:{
    proxy:{
      "/api": {
        target:"",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  },
  build:{
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'exports/index.ts'),
      name: 'MyLib',
      // the proper extensions will be added
      fileName: 'my-lib',
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
    },
  }
})
