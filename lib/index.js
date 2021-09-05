/*
 * @Description:
 * @Author: Guosugaz
 * @LastEditors: Guosugaz
 * @Date: 2021-07-10 23:07:07
 * @LastEditTime: 2021-09-05 16:07:30
 */
import Vue from "vue";
import Print from "./Print";
var createPrintBind = function () {
    var listener;
    var printBind = function (el, binding, vnode) {
        var vue = vnode.context;
        var closeBtn = true;
        var id = "";
        if (listener) {
            el.removeEventListener("click", listener);
            listener = null;
        }
        listener = function () {
            vue.$nextTick(function () {
                if (typeof binding.value === "string") {
                    id = binding.value;
                }
                else if (typeof binding.value === "object" && !!binding.value.id) {
                    id = binding.value.id;
                    var ids = id.replace(new RegExp("#", "g"), "");
                    var elsdom = document.getElementById(ids);
                    if (!elsdom)
                        console.log("id in Error"), (id = "");
                }
                // 局部打印
                if (id) {
                    localPrint();
                }
                else {
                    // 直接全局打印
                    window.print();
                }
            });
        };
        var localPrint = function () {
            if (closeBtn) {
                closeBtn = false;
                new Print({
                    id: id,
                    standard: "",
                    extraHead: binding.value.extraHead,
                    extraCss: binding.value.extraCss,
                    addPrintCss: binding.value.addPrintCss,
                    popTitle: binding.value.popTitle,
                    endCallback: function () {
                        // 调用打印之后的回调事件
                        closeBtn = true;
                    }
                });
            }
        };
        el.addEventListener("click", listener);
    };
    printBind.destory = function (el) {
        if (listener) {
            el.removeEventListener("click", listener);
            listener = null;
            return;
        }
    };
    return printBind;
};
export default {
    install: function () {
        var printBind = createPrintBind();
        Vue.directive("print", {
            bind: printBind,
            update: printBind,
            unbind: printBind.destory
        });
    },
    createPrintBind: createPrintBind,
    Print: Print
};
