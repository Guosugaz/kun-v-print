/*
 * @Description:
 * @Author: Guosugaz
 * @LastEditors: Guosugaz
 * @Date: 2021-07-10 23:07:07
 * @LastEditTime: 2021-09-05 22:34:20
 */
import Vue from "vue";
import Print from "./Print";
import { DirectiveFunction } from "vue/types";

interface PrintBind extends DirectiveFunction {
  destory: (el: HTMLElement) => void;
}

const createPrintBind = () => {
  let listener: null | (() => void);

  const printBind: PrintBind = (el, binding, vnode) => {
    let vue = vnode.context;
    let closeBtn = true;
    let id = "";

    if (listener) {
      el.removeEventListener("click", listener);
      listener = null;
    }

    listener = () => {
      vue!.$nextTick(() => {
        if (typeof binding.value === "string") {
          id = binding.value;
        } else if (typeof binding.value === "object" && !!binding.value.id) {
          id = binding.value.id;
          let ids = id.replace(new RegExp("#", "g"), "");
          let elsdom = document.getElementById(ids);
          if (!elsdom) console.log("id in Error"), (id = "");
        }
        // 局部打印
        if (id) {
          localPrint();
        } else {
          // 直接全局打印
          window.print();
        }
      });
    };

    const localPrint = () => {
      if (closeBtn) {
        closeBtn = false;
        new Print({
          id: id, // * 局部打印必传入id
          standard: "", // 文档类型，默认是html5，可选 html5，loose，strict
          extraHead: binding.value.extraHead, // 附加在head标签上的额外标签,使用逗号分隔
          extraCss: binding.value.extraCss, // 额外的css连接，多个逗号分开
          addPrintCss: binding.value.addPrintCss, // 额外 css，传字符串
          popTitle: binding.value.popTitle, // title的标题
          endCallback() {
            // 调用打印之后的回调事件
            closeBtn = true;
          }
        });
      }
    };

    el.addEventListener("click", listener);
  };

  printBind.destory = (el) => {
    if (listener) {
      el.removeEventListener("click", listener);
      listener = null;
      return;
    }
  };

  return printBind;
};

export default {
  install() {
    const printBind = createPrintBind();
    Vue.directive("print", {
      bind: printBind,
      update: printBind,
      unbind: printBind.destory
    });
  },
  createPrintBind: createPrintBind,
  Print
};
