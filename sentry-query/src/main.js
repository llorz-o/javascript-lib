import { createApp } from "vue";
import App from "./App.vue";
import VXETable from "vxe-table";
import "vxe-table/lib/style.css";

createApp(App)
  .use((app) => app.use(VXETable))
  .mount("#app");
