import { defineConfig } from "vite";
import electron from "vite-plugin-electron";
import renderer from "vite-plugin-electron-renderer";
import vue from "@vitejs/plugin-vue";
import path from "path";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Inspect from "vite-plugin-inspect";

const pathSrc = path.resolve(__dirname, "src");
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue"],
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: "Icon"
        })
      ]
    }),
    Components({
      resolvers: [
        IconsResolver({
          enabledCollections: ["ep"]
        }),
        ElementPlusResolver()
      ]
    }),
    Icons({
      autoInstall: true
    }),
    Inspect(),
    electron([
      {
        // Main-Process entry file of the Electron App.
        entry: "electron/main.ts"
      },
      {
        entry: "electron/preload.ts",
        onstart(options) {
          // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete,
          // instead of restarting the entire Electron App.
          options.reload();
        }
      }
    ]),
    renderer()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});
