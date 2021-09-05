interface BaseOptions {
    standard: string;
    extraHead: string;
    extraCss: string;
    popTitle: string;
    addPrintCss: string;
    endCallback: null | (() => void);
}
declare type OptiosnTemp = {
    [K in keyof BaseOptions]?: BaseOptions[K];
};
interface Options extends OptiosnTemp {
    id: string;
}
interface Settings extends BaseOptions {
    id: string;
    fId: string;
}
export default class {
    standards: Record<string, string>;
    settings: Settings;
    counter: number;
    selectArray: never[];
    constructor(option: Options);
    private init;
    private print;
    private write;
    private docType;
    private getHead;
    private getBody;
    private getPrintWindow;
    private Iframe;
}
export {};
