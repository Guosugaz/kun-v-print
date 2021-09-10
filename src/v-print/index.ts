/*
 * @Description:
 * @Author: Guosugaz
 * @LastEditors: Guosugaz
 * @Date: 2021-07-10 23:07:07
 * @LastEditTime: 2021-09-10 12:58:41
 */
import Vue, { VNode } from "vue";
import Print from "./Print";
import { DirectiveBinding } from "vue/types/options";

type Listener = () => void;

type PrintBind = (
  el: HTMLElement,
  binding: DirectiveBinding,
  vnode: VNode,
  oldVnode: VNode,
  destory?: boolean,
) => void;

let $id = 1;
const listeners: Record<string, Listener> = {};
const getPIdKey = (id: number | string) => `printId${id}`;

const printBind: PrintBind = (el, binding, vnode, oldVonde, destory) => {
  const vue = vnode.context;
  let closeBtn = true;
  let id = "";
  const printId = el.dataset.printId;

  if (printId) {
    if (listeners[getPIdKey(printId)]) {
      el.removeEventListener("click", listeners[getPIdKey(printId)]);
      delete listeners[getPIdKey(printId)];
      if (destory) return;
    }
  }

  if (typeof binding.value === "string") {
    id = binding.value;
  } else if (typeof binding.value === "object" && !!binding.value.id) {
    id = binding.value.id;
  }

  if (!el.dataset.printId) {
    el.dataset.printId = "" + $id++;
  }

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
        },
      });
    }
  };

  const listener = () => {
    vue?.$nextTick(() => {
      const ids = id.replace(new RegExp("#", "g"), "");
      const elsdom = document.getElementById(ids);
      if (!elsdom) console.log("id in Error"), (id = "");
      // 局部打印
      if (id) {
        localPrint();
      } else {
        // 直接全局打印
        window.print();
      }
    });
  };

  el.addEventListener("click", listener);

  listeners[getPIdKey(el.dataset.printId)] = listener;
};

export default {
  install() {
    Vue.directive("print", {
      bind: printBind,
      update: printBind,
      unbind: (...args) => printBind(...args, true),
    });
  },
  printBind,
  Print,
};
