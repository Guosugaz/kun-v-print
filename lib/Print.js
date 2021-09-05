var default_1 = /** @class */ (function () {
    function default_1(option) {
        this.counter = 0;
        this.selectArray = [];
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
    default_1.prototype.init = function () {
        this.counter++;
        this.settings.fId = "printArea_" + this.counter;
        var PrintAreaWindow = this.getPrintWindow(); // 创建iframe
        this.write(PrintAreaWindow.doc); // 写入内容
        this.print(PrintAreaWindow);
        this.settings.endCallback && this.settings.endCallback();
    };
    default_1.prototype.print = function (pAWindow) {
        var paWindow = pAWindow.win;
        var _loaded = function () {
            paWindow.focus();
            paWindow.print();
        };
        if (window.ActiveXObject) {
            console.log("IE Print");
            paWindow.onload = function () {
                setTimeout(function () {
                    _loaded();
                }, 0);
            };
            return false;
        }
        paWindow.onload = function () {
            _loaded();
        };
    };
    default_1.prototype.write = function (pADocument) {
        pADocument.open();
        pADocument.write(this.docType() + "<html>" + this.getHead() + this.getBody() + "</html>");
        pADocument.close();
    };
    default_1.prototype.docType = function () {
        if (this.settings.standard === this.standards.html5) {
            return "<!DOCTYPE html>";
        }
        var transitional = this.settings.standard === this.standards.loose ? " Transitional" : "";
        var dtd = this.settings.standard === this.standards.loose ? "loose" : "strict";
        return "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01" + transitional + "//EN\" \"http://www.w3.org/TR/html4/" + dtd + ".dtd\">";
    };
    default_1.prototype.getHead = function () {
        var extraHead = "";
        var links = "";
        var style = "";
        var styleTem = "";
        if (this.settings.extraHead) {
            this.settings.extraHead.replace(/([^,]+)/g, function (m) { return (extraHead += m); });
        }
        var _links = document.querySelectorAll("link");
        if (typeof _links === "object" || _links.length > 0) {
            // 复制所有link标签
            for (var i = 0; i < _links.length; i++) {
                var item = _links[i];
                if (item.href.indexOf(".css") >= 0) {
                    links += "<link type=\"text/css\" rel=\"stylesheet\" href=\"" + item.href + "\" >";
                }
            }
        }
        // 循环获取style标签的样式
        var domStyle = document.styleSheets;
        if (domStyle && domStyle.length > 0) {
            for (var i = 0; i < domStyle.length; i++) {
                try {
                    if (domStyle[i].cssRules || domStyle[i].rules) {
                        var rules = domStyle[i].cssRules || domStyle[i].rules;
                        for (var b = 0; b < rules.length; b++) {
                            styleTem += rules[b].cssText;
                        }
                    }
                }
                catch (e) {
                    console.log(domStyle[i].href || "" + e);
                }
            }
        }
        style = styleTem + this.settings.addPrintCss;
        if (this.settings.extraCss) {
            this.settings.extraCss.replace(/([^,\s]+)/g, function (m) { return (links += "<link type=\"text/css\" rel=\"stylesheet\" href=\"" + m + "\">"); });
        }
        return "<head><title>" + this.settings.popTitle + "</title>" + extraHead + links + "<style type=\"text/css\">" + style + "</style></head>";
    };
    default_1.prototype.getBody = function () {
        var id = this.settings.id;
        id = id.replace(new RegExp("#", "g"), "");
        var elsdom = document.getElementById(id);
        return "<body>" + (elsdom === null || elsdom === void 0 ? void 0 : elsdom.outerHTML) + "</body>";
    };
    default_1.prototype.getPrintWindow = function () {
        var f = this.Iframe();
        return {
            f: f,
            win: f.contentWindow || f,
            doc: f.doc
        };
    };
    default_1.prototype.Iframe = function () {
        var frameId = this.settings.fId;
        var iframe;
        try {
            iframe = document.createElement("iframe");
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
                    : iframe.document;
        }
        catch (e) {
            throw new Error(e + ". iframes may not be supported in this browser.");
        }
        if (iframe.doc === null || iframe.doc === undefined) {
            throw new Error("Cannot find document.");
        }
        return iframe;
    };
    return default_1;
}());
export default default_1;
