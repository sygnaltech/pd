"use strict";
(() => {
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // node_modules/@sygnal/sse/dist/page.js
  var __awaiter = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var Page = class {
    static getQueryParam(name) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(name);
    }
    static loadScript(url) {
      const script = document.createElement("script");
      script.src = url;
      document.body.appendChild(script);
    }
    static loadCSS(url) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = url;
      document.head.appendChild(link);
    }
    static loadEngineCSS(cssFileName) {
      let libPath = window.SSE.baseUrl;
      const cssURL = `${libPath}/css/${cssFileName}`;
      this.loadCSS(cssURL);
    }
    static loadStyle(css) {
      const style = document.createElement("style");
      style.innerText = css;
      document.head.appendChild(style);
    }
    static replaceScriptSource(element, newSrc) {
      element.src = newSrc;
    }
    static replaceCSSLink(element, newHref) {
      element.href = newHref;
    }
    static prependToTitle(text) {
      document.title = `${text}${document.title}`;
    }
    static getCurrentScriptUrl() {
      if (document.currentScript) {
        const currentScript = document.currentScript;
        return currentScript.src;
      }
      console.error("document.currentScript is not supported in this browser.");
      return null;
    }
    static getCurrentScriptBaseUrl() {
      const currentScript = document.currentScript;
      if (currentScript) {
        const scriptURL = new URL(currentScript.src);
        const origin = scriptURL.origin;
        const path = scriptURL.pathname.substring(0, scriptURL.pathname.lastIndexOf("/"));
        const baseURL = `${origin}${path}`;
        return baseURL;
      } else {
        console.error("Unable to determine the currently executing script.");
      }
      return void 0;
    }
    static findAncestorWithAttribute(element, attributeName) {
      let currentElement = element;
      while (currentElement) {
        if (currentElement.hasAttribute(attributeName)) {
          return currentElement;
        }
        currentElement = currentElement.parentElement;
      }
      return null;
    }
    static getAncestorAttributeValue(element, attributeName) {
      let currentElement = element;
      while (currentElement) {
        if (currentElement.hasAttribute(attributeName)) {
          return currentElement.getAttribute(attributeName);
        }
        currentElement = currentElement.parentElement;
      }
      return null;
    }
    static hasAncestorWithAttribute(element, attributeName) {
      return this.findAncestorWithAttribute(element, attributeName) !== null;
    }
    static convertToPixels(value, contextElement = document.documentElement) {
      const match = value.match(/^(-?\d+\.?\d*)(rem|em|px|vh|vw|%)$/);
      if (!match)
        throw new Error("Invalid value format");
      const [, amountStr, unit] = match;
      const amount = parseFloat(amountStr);
      switch (unit) {
        case "px":
          return amount;
        case "rem":
          return amount * parseFloat(getComputedStyle(document.documentElement).fontSize);
        case "em":
          return amount * parseFloat(getComputedStyle(contextElement).fontSize);
        case "vh":
          return amount * window.innerHeight / 100;
        case "vw":
          return amount * window.innerWidth / 100;
        case "%":
          return amount * contextElement.clientWidth / 100;
        default:
          throw new Error("Unsupported unit");
      }
    }
    static getResponseHeader(headerName_1) {
      return __awaiter(this, arguments, void 0, function* (headerName, url = void 0) {
        const headers = yield this.getResponseHeaders(url);
        if (!headers)
          return void 0;
        if (!headers.has(headerName))
          return void 0;
        return headers.get(headerName) || void 0;
      });
    }
    static getResponseHeaders() {
      return __awaiter(this, arguments, void 0, function* (url = void 0) {
        try {
          if (!url) {
            url = window.location.href;
          }
          const response = yield fetch(url, {
            method: "HEAD"
          });
          return response.headers;
        } catch (error) {
          console.error("Error checking reverse proxy header:", error);
        }
        return void 0;
      });
    }
  };

  // node_modules/js-cookie/dist/js.cookie.mjs
  function assign(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        target[key] = source[key];
      }
    }
    return target;
  }
  var defaultConverter = {
    read: function(value) {
      if (value[0] === '"') {
        value = value.slice(1, -1);
      }
      return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
    },
    write: function(value) {
      return encodeURIComponent(value).replace(
        /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
        decodeURIComponent
      );
    }
  };
  function init(converter, defaultAttributes) {
    function set(name, value, attributes) {
      if (typeof document === "undefined") {
        return;
      }
      attributes = assign({}, defaultAttributes, attributes);
      if (typeof attributes.expires === "number") {
        attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
      }
      if (attributes.expires) {
        attributes.expires = attributes.expires.toUTCString();
      }
      name = encodeURIComponent(name).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
      var stringifiedAttributes = "";
      for (var attributeName in attributes) {
        if (!attributes[attributeName]) {
          continue;
        }
        stringifiedAttributes += "; " + attributeName;
        if (attributes[attributeName] === true) {
          continue;
        }
        stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
      }
      return document.cookie = name + "=" + converter.write(value, name) + stringifiedAttributes;
    }
    function get(name) {
      if (typeof document === "undefined" || arguments.length && !name) {
        return;
      }
      var cookies = document.cookie ? document.cookie.split("; ") : [];
      var jar = {};
      for (var i = 0; i < cookies.length; i++) {
        var parts = cookies[i].split("=");
        var value = parts.slice(1).join("=");
        try {
          var found = decodeURIComponent(parts[0]);
          jar[found] = converter.read(value, found);
          if (name === found) {
            break;
          }
        } catch (e) {
        }
      }
      return name ? jar[name] : jar;
    }
    return Object.create(
      {
        set,
        get,
        remove: function(name, attributes) {
          set(
            name,
            "",
            assign({}, attributes, {
              expires: -1
            })
          );
        },
        withAttributes: function(attributes) {
          return init(this.converter, assign({}, this.attributes, attributes));
        },
        withConverter: function(converter2) {
          return init(assign({}, this.converter, converter2), this.attributes);
        }
      },
      {
        attributes: { value: Object.freeze(defaultAttributes) },
        converter: { value: Object.freeze(converter) }
      }
    );
  }
  var api = init(defaultConverter, { path: "/" });

  // node_modules/@sygnal/sse/dist/routeDispatcher.js
  var RouteDispatcher = class {
    constructor(SiteClass) {
      this._SiteClass = SiteClass;
    }
    matchRoute(path) {
      for (const route in this.routes) {
        if (route.endsWith("*")) {
          const baseRoute = route.slice(0, -1);
          if (path.startsWith(baseRoute)) {
            return this.routes[route];
          }
        } else if (route === path) {
          return this.routes[route];
        }
      }
      return null;
    }
    setupRoute() {
      const site = new this._SiteClass();
      site.setup();
      const path = window.location.pathname;
      const HandlerClass = this.matchRoute(path);
      if (HandlerClass) {
        const handlerInstance = new HandlerClass();
        handlerInstance.setup();
      } else {
      }
    }
    execRoute() {
      const site = new this._SiteClass();
      site.exec();
      const path = window.location.pathname;
      const HandlerClass = this.matchRoute(path);
      if (HandlerClass) {
        const handlerInstance = new HandlerClass();
        handlerInstance.exec();
      } else {
      }
    }
  };

  // src/site.ts
  var Site = class {
    constructor() {
    }
    setup() {
      console.log("load scripts");
      Page.loadEngineCSS("site.css");
    }
    exec() {
      Page.loadScript("//book.gettimely.com/widget/book-button-v1.5.js");
      this.addActionToBookLinks();
    }
    addActionToBookLinks() {
      const bookElements = document.querySelectorAll("[pd-book]");
      bookElements.forEach((element) => {
        const currentHref = element.getAttribute("href");
        if (currentHref) {
          element.setAttribute("href", `${currentHref}?action=book`);
        }
      });
    }
  };

  // src/services/booking/timely.ts
  var TimelyService = class {
    constructor(account) {
      this.account = account;
    }
    init() {
      return __async(this, null, function* () {
      });
    }
    bookService(categoryId, serviceId) {
      const bookingButton = new timelyButton(
        this.account,
        {
          location: this.defaultLocationId,
          staff: this.defaultStaffId,
          category: categoryId,
          product: serviceId,
          dontCreateButton: true
        }
      );
      bookingButton.start();
    }
  };

  // src/util.ts
  function addEventListeners(selector, event, handler) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      element.addEventListener(event, handler);
    });
  }

  // src/page/services.ts
  var ServicesPage = class {
    constructor() {
      this.timely = new TimelyService("ponsonbydoctors");
    }
    setup() {
    }
    exec() {
      if (!window.data) {
        console.error("Window.data is not available.");
        return;
      }
      addEventListeners('*[timely="book"]', "click", (e) => {
        const target = e.currentTarget;
        this.timely.bookService(
          target.getAttribute("categoryId"),
          target.getAttribute("serviceId")
        );
      });
      addEventListeners('*[timely="ponsonby"]', "click", (e) => {
        const target = e.currentTarget;
        this.timely.bookService(
          target.getAttribute("categoryId"),
          target.getAttribute("serviceId")
        );
      });
      addEventListeners('*[timely="ponsonby-service"]', "click", (e) => {
        const target = e.currentTarget;
        this.timely.bookService(
          target.getAttribute("categoryId"),
          target.getAttribute("serviceId")
        );
      });
      addEventListeners('*[timely="online"]', "click", (e) => {
        const target = e.currentTarget;
        this.timely.bookService(
          target.getAttribute("categoryId"),
          target.getAttribute("serviceId")
        );
      });
      addEventListeners('*[timely="online-service"]', "click", (e) => {
        const target = e.currentTarget;
        this.timely.bookService(
          target.getAttribute("categoryId"),
          target.getAttribute("serviceId")
        );
      });
      if (window.location.search.includes("action=book")) {
        this.timely.bookService(
          window.data.timely_categoryId,
          window.data.timely_productId
        );
      }
    }
  };

  // src/page/clinic.ts
  var ClinicPage = class {
    constructor() {
    }
    setup() {
    }
    exec() {
    }
  };

  // src/routes.ts
  var routeDispatcher = () => {
    var routeDispatcher2 = new RouteDispatcher(Site);
    routeDispatcher2.routes = {
      "/services/*": ServicesPage,
      "/clinics/*": ClinicPage
    };
    return routeDispatcher2;
  };
})();
/*! js-cookie v3.0.5 | MIT */
//# sourceMappingURL=routes.js.map
