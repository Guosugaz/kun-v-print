import { __spreadArray } from "tslib";
/*
 * @Description:
 * @Author: Guosugaz
 * @LastEditors: Guosugaz
 * @Date: 2021-07-10 23:07:07
 * @LastEditTime: 2021-09-10 12:58:41
 */
import Vue from "vue";
import Print from "./Print";
var $id = 1;
var listeners = {};
var getPIdKey = function (id) { return "printId" + id; };
var printBind = function (el, binding, vnode, oldVonde, destory) {
    var vue = vnode.context;
    var closeBtn = true;
    var id = "";
    var printId = el.dataset.printId;
    if (printId) {
        if (listeners[getPIdKey(printId)]) {
            el.removeEventListener("click", listeners[getPIdKey(printId)]);
            delete listeners[getPIdKey(printId)];
            if (destory)
                return;
        }
    }
    if (typeof binding.value === "string") {
        id = binding.value;
    }
    else if (typeof binding.value === "object" && !!binding.value.id) {
        id = binding.value.id;
    }
    if (!el.dataset.printId) {
        el.dataset.printId = "" + $id++;
    }
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
                },
            });
        }
    };
    var listener = function () {
        vue === null || vue === void 0 ? void 0 : vue.$nextTick(function () {
            var ids = id.replace(new RegExp("#", "g"), "");
            var elsdom = document.getElementById(ids);
            if (!elsdom)
                console.log("id in Error"), (id = "");
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
    el.addEventListener("click", listener);
    listeners[getPIdKey(el.dataset.printId)] = listener;
};
export default {
    install: function () {
        Vue.directive("print", {
            bind: printBind,
            update: printBind,
            unbind: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return printBind.apply(void 0, __spreadArray(__spreadArray([], args, false), [true], false));
            },
        });
    },
    printBind: printBind,
    Print: Print,
};
