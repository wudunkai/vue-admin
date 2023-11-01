import { defineStore } from "pinia";
import { theme } from "ant-design-vue";

/**
 * themeColor 配置 开启持久化
 */
export const useAppStore = defineStore({
  id: "themeColor",
  state: () => ({
    themeName: "#1f4bad", // 主题颜色
    darkMode: "light", // 主题模式
    grayMode: false, // 灰色模式
    colorWeak: false, // 色弱模式
  }),
  actions: {
    async setThemeName(value: string) {
      this.$patch({
        themeName: value,
      });
    },
    async toggleDarkMode() {
      this.$patch({
        darkMode: this.darkMode === "light" ? "dark" : "light",
      });
    },
  },
  getters: {
    themeConfig(state) {
      document.documentElement.setAttribute("data-theme", state.themeName);
      document.documentElement.setAttribute("data-dark", state.darkMode);
      document
        .getElementsByTagName("body")[0]
        .style.setProperty("--el-color-primary", state.themeName);
      const classNames: Array<string> = [];
      state.grayMode && classNames.push("gray-mode");
      state.colorWeak && classNames.push("color-weak");
      document.getElementsByTagName("html")[0].className = classNames.join(" ");
      // 主题配置
      return {
        token: {
          colorPrimary: state.themeName,
        },
        algorithm:
          state.darkMode === "light"
            ? theme.defaultAlgorithm
            : theme.darkAlgorithm,
      };
    },
  },
  persist: {
    key: "themeColor", // 指定key进行存储，此时非key的值不会持久化，刷新就会丢失
    storage: localStorage, // 指定换成地址
    paths: ["darkMode", "grayMode", "colorWeak"], // 指定需要持久化的state的路径名称
  },
});
