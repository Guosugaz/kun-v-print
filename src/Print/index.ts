import Print from "./Print";

export default {
  install(Vue: any, options = {}) {
    Vue.prototype.$VPrint = new Print(options);
  }
};
