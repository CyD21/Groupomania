/* eslint-disable prettier/prettier */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./components/axios.js";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/styles/styles.css";

const app = createApp(App);

app.use(router)
   .use(store)
   .mount("#app");
import "bootstrap/dist/js/bootstrap.js";
