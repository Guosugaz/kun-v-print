interface BaseOptions {
    standard: string;
    extraHead: string;
    extraCss: string;
    popTitle: string;
    addPrintCss: string;
}
declare type Options = {
    [K in keyof BaseOptions]?: BaseOptions[K];
};
interface Settings extends BaseOptions {
    fId: string;
    id: string;
}
export default class {
    standards: Record<string, string>;
    deFaultSettings: Settings;
    settings: Settings;
    selectArray: never[];
    constructor(option: Options);
    print(id: string, option?: Options): false | undefined;
    private write;
    private docType;
    private getHead;
    private getBody;
    private getPrintWindow;
    private Iframe;
}
export {};
