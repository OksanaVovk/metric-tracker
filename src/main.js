import { createApp } from "vue";
import store from "./store";
import "./style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import Dialog from "primevue/dialog";

const app = createApp(App);
app.use(store);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.component("Dialog", Dialog);

app.mount("#app");
