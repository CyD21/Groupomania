import "bootstrap/dist/css/bootstrap.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/styles/styles.css";
import "./components/axios.js";

const app = createApp(App);

app.use(router);

app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";
