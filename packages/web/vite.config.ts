import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import vue from '@vitejs/plugin-vue'
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
      AutoImport({
        imports: ['vue', 'vue-router'],
        // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'types/auto-import.d.ts'
        dts: 'types/auto-import.d.ts'
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
        '/api': {
          target: 'http://127.0.0.1:8000',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '/')
        }
      }
    },
    base: base,
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          //生产环境时移除console、debugger
          drop_console: true,
          drop_debugger: true
        }
      }
    }
  })
}
