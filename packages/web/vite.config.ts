import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import vue from '@vitejs/plugin-vue'

import electron from 'vite-plugin-electron'
import electronRenderer from 'vite-plugin-electron-renderer'
import polyfillExports from 'vite-plugin-electron-renderer'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// https://vitejs.dev/config/
export default ({ mode }: never) => {
  const envDir = './viteEnv'
  const env = loadEnv(mode, `${process.cwd()}/viteEnv`)
  const base = './'
  return defineConfig({
    envDir,
    plugins: [
      vue(),
      electron([
        {
          entry: 'electron-main/index.ts' // 主进程文件
        },
        {
          entry: 'electron-preload/preload.ts'
        }
      ]),
      electronRenderer(),
      polyfillExports(),
      AutoImport({
        imports: ['vue', 'vue-router', '@vueuse/core', 'pinia'],
        // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'types/auto-import.d.ts'
        dts: 'types/auto-import.d.ts',
        dirs: ['src/stores', 'src/composables']
      }),
      Components({
        dirs: ['src/components'],
        extensions: ['vue', 'tsx'],
        // 配置文件生成位置
        dts: 'types/components.d.ts'
      }),
      // 生成环境变量的内容
      createHtmlPlugin({
        inject: {
          data: {
            ...env
          }
        }
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        scss: {
          // 引入 var.scss 这样就可以在全局中使用 var.scss中预定义的变量了
          additionalData: '@import "./src/assets/styles/glob.scss";'
        }
      }
    },
    server: {
      hmr: true,
      port: 80, // 设置服务启动端口号
      open: false, // 设置服务启动时是否自动打开浏览器
      cors: true, // 允许跨域
      // https: true, // 设置代理，根据我们项目实际情况配置
      proxy: {
        '/basic-api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/basic-api`), '')
          // only https
          // secure: false
        },
        '/upload': {
          target: 'http://localhost:3300/upload',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/upload`), '')
        }
      }
    },
    base: base,
    build: {
      emptyOutDir: false, // 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录
      outDir: 'dist-electron',
      minify: 'terser',
      terserOptions: {
        compress: {
          //生产环境时移除console、debugger
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          // 最小化拆分包
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // 通过拆分包的方式将所有来自node_modules的模块打包到单独的chunk中
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          },
          // 设置chunk的文件名格式
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId
              ? chunkInfo.facadeModuleId.split('/')
              : []
            const fileName1 = facadeModuleId[facadeModuleId.length - 2] || '[name]'
            // 根据chunk的facadeModuleId（入口模块的相对路径）生成chunk的文件名
            return `static/js/${fileName1}/[name].[hash].js`
          },
          // 设置入口文件的文件名格式
          entryFileNames: 'static/js/[name].[hash].js',
          // 设置静态资源文件的文件名格式
          assetFileNames: 'static/[ext]/[name].[hash:4].[ext]'
        }
      }
    }
  })
}
