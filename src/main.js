import Vue from "vue";
import App from "./index.vue";
import VPrint from "../lib/index";

Vue.use(VPrint);

new Vue({
  el: "#app",
  render: (h) => h(App)
});
