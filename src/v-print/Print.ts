interface BaseOptions {
  standard: string;
  extraHead: string; // 附加在head标签上的额外元素,使用逗号分隔
  extraCss: string; // 额外的css逗号分隔
  popTitle: string; // 标题
  addPrintCss: string;
  endCallback: null | (() => void); // 成功打开后的回调函数
}

type OptiosnTemp = {
  [K in keyof BaseOptions]?: BaseOptions[K];
};

interface Options extends OptiosnTemp {
  id: string; // 局部打印的id
}

interface Settings extends BaseOptions {
  id: string; // 局部打印的id
  fId: string; // iframe id
}

interface IFrameElement extends HTMLIFrameElement {
  doc: Document;
}

interface PAWindow {
  f: IFrameElement;
  win: IFrameElement | Window;
  doc: Document;
}

export default class {
  standards: Record<string, string>;
  settings: Settings;
  counter = 0;
  selectArray = [];

  constructor(option: Options) {
    this.standards = {
      strict: "strict",
      loose: "loose",
      html5: "html5"
    };
    this.settings = {
      standard: this.standards.html5,
      extraHead: "",
      extraCss: "",
      popTitle: "",
      addPrintCss: "",
      endCallback: null,
      id: "",
      fId: ""
    };
    Object.assign(this.settings, option);

    this.init();
  }

  private init() {
    this.counter++;
    this.settings.fId = `printArea_${this.counter}`;
    const PrintAreaWindow = this.getPrintWindow(); // 创建iframe
    this.write(PrintAreaWindow.doc); // 写入内容
    this.print(PrintAreaWindow);
    this.settings.endCallback && this.settings.endCallback();
  }

  private print(pAWindow: PAWindow) {
    const paWindow = pAWindow.win;
    const _loaded = () => {
      paWindow.focus();
      (<any>paWindow).print();
    };
    if (window.ActiveXObject) {
      console.log("IE Print");
      paWindow.onload = () => {
        setTimeout(() => {
          _loaded();
        }, 0);
      };
      return false;
    }
    paWindow.onload = () => {
      _loaded();
    };
  }

  private write(pADocument: Document) {
    pADocument.open();
    pADocument.write(
      `${this.docType()}<html>${this.getHead()}${this.getBody()}</html>`
    );
    pADocument.close();
  }

  private docType() {
    if (this.settings.standard === this.standards.html5) {
      return "<!DOCTYPE html>";
    }
    const transitional =
      this.settings.standard === this.standards.loose ? " Transitional" : "";
    const dtd =
      this.settings.standard === this.standards.loose ? "loose" : "strict";

    return `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01${transitional}//EN" "http://www.w3.org/TR/html4/${dtd}.dtd">`;
  }

  private getHead() {
    let extraHead = "";
    let links = "";
    let style = "";
    let styleTem = "";
    if (this.settings.extraHead) {
      this.settings.extraHead.replace(/([^,]+)/g, (m) => (extraHead += m));
    }
    const _links = document.querySelectorAll("link");
    if (typeof _links === "object" || (_links as any).length > 0) {
      // 复制所有link标签
      for (let i = 0; i < _links.length; i++) {
        const item = _links[i];
        if (item.href.indexOf(".css") >= 0) {
          links += `<link type="text/css" rel="stylesheet" href="${item.href}" >`;
        }
      }
    }
    // 循环获取style标签的样式
    const domStyle = document.styleSheets;
    if (domStyle && domStyle.length > 0) {
      for (let i = 0; i < domStyle.length; i++) {
        try {
          if (domStyle[i].cssRules || domStyle[i].rules) {
            const rules = domStyle[i].cssRules || domStyle[i].rules;
            for (let b = 0; b < rules.length; b++) {
              styleTem += rules[b].cssText;
            }
          }
        } catch (e) {
          console.log(domStyle[i].href || "" + e);
        }
      }
    }
    style = styleTem + this.settings.addPrintCss;
    if (this.settings.extraCss) {
      this.settings.extraCss.replace(
        /([^,\s]+)/g,
        (m) => (links += `<link type="text/css" rel="stylesheet" href="${m}">`)
      );
    }

    return `<head><title>${this.settings.popTitle}</title>${extraHead}${links}<style type="text/css">${style}</style></head>`;
  }

  private getBody(): string {
    let id = this.settings.id;
    id = id.replace(new RegExp("#", "g"), "");
    const elsdom = document.getElementById(id);
    return "<body>" + elsdom?.outerHTML + "</body>";
  }

  private getPrintWindow() {
    const f = this.Iframe();
    return {
      f: f,
      win: f.contentWindow || f,
      doc: f.doc
    };
  }

  private Iframe() {
    const frameId = this.settings.fId;
    let iframe: IFrameElement;

    try {
      iframe = document.createElement("iframe") as IFrameElement;
      document.body.appendChild(iframe);
      iframe.style.border = "0px";
      iframe.style.position = "absolute";
      iframe.style.width = "0px";
      iframe.style.height = "0px";
      iframe.style.right = "0px";
      iframe.style.top = "0px";
      iframe.setAttribute("id", frameId);
      iframe.setAttribute("src", "" + new Date().getTime());
      iframe.doc = iframe.contentDocument
        ? iframe.contentDocument
        : iframe.contentWindow
        ? iframe.contentWindow.document
        : (iframe as any).document;
    } catch (e) {
      throw new Error(e + ". iframes may not be supported in this browser.");
    }

    if (iframe.doc === null || iframe.doc === undefined) {
      throw new Error("Cannot find document.");
    }

    return iframe;
  }
}
