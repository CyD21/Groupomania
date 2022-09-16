/* eslint-disable prettier/prettier */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "../src/_services/axios";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/styles/styles.css";
import "bootstrap/dist/js/bootstrap.js";

const app = createApp(App);

app.use(router)
   .use(store)
   .mount("#app");
