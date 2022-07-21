import { createApp } from "vue";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";
import "./components/axios.js";
import App from "./App.vue";
import router from "./router";
import "./assets/styles/styles.css";

const app = createApp(App);

app.use(router);
app.use(store);

app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";
