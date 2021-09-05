import Print from "./Print";
import { DirectiveFunction } from "vue/types";
interface PrintBind extends DirectiveFunction {
    destory: (el: HTMLElement) => void;
}
declare const _default: {
    install(): void;
    createPrintBind: () => PrintBind;
    Print: typeof Print;
};
export default _default;
