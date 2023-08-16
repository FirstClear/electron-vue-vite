import { createApp } from "vue";
import { createPinia } from "pinia";
import AppComp from "./App.vue";
import router from "./router";

import "element-plus/dist/index.css";


const pinia = createPinia();
const app = createApp(AppComp);
app
  .use(pinia)
  .use(router)
  .mount("#app")
  .$nextTick(() => postMessage({ payload: "removeLoading" }, "*"));
app.config.globalProperties.$api = (window as any).electron.ipcRenderer.invoke;
