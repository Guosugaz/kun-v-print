import Print from "./Print";
export default {
    install: function (Vue, options) {
        if (options === void 0) { options = {}; }
        Vue.prototype.$VPrint = new Print(options);
    }
};
