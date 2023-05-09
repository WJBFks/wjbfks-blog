import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import Cropper from "vue3-cropper";
import "element-plus/dist/index.css";
import "vue3-cropper/lib/vue3-cropper.css";

createApp(App)
  .use(ElementPlus)
  .use(store)
  .use(router)
  .use(Cropper)
  .mount("#app");
