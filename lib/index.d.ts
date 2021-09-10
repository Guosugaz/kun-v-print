import { VNode } from "vue";
import Print from "./Print";
import { DirectiveBinding } from "vue/types/options";
declare type PrintBind = (el: HTMLElement, binding: DirectiveBinding, vnode: VNode, oldVnode: VNode, destory?: boolean) => void;
declare const _default: {
    install(): void;
    printBind: PrintBind;
    Print: typeof Print;
};
export default _default;
