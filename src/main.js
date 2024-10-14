import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import globalComponents from "./global-components";
import utils from "./utils";
import "./assets/css/app.css";
import VuePlayerVideo from 'vue3-player-video'
import '@vuepic/vue-datepicker/dist/main.css'
import '@vueform/multiselect/themes/default.css'
const app = createApp(App).use(router).use(createPinia()).use(VuePlayerVideo);

globalComponents(app);
utils(app);

app.mount("#app");
