import { createApp } from "vue";
import store from "./store";
import "./style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";

const app = createApp(App);
app.use(store);
app.use(PrimeVue);

app.mount("#app");
