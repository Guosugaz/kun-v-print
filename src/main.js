import Vue from "vue";
import App from "./index.vue";
import vPrint from "../lib/index";

Vue.use(vPrint);

new Vue({
  el: "#app",
  render: (h) => h(App)
});
