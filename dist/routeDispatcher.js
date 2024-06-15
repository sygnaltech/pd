"use strict";
(() => {
  // src/util.ts
  function loadCSS(url) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    document.head.appendChild(link);
  }

  // src/site.ts
  var Site = class {
    constructor() {
    }
    setup() {
      const currentScript = document.currentScript;
      if (!currentScript) {
        console.log("Could not determine the current script.");
        return;
      }
      const fullUrl = new URL(currentScript.src);
      const pathWithoutFile = fullUrl.origin + fullUrl.pathname.substring(0, fullUrl.pathname.lastIndexOf("/") + 1);
      console.log("Current script URL without file name:", pathWithoutFile);
      console.log("installing site CSS");
      loadCSS(pathWithoutFile + "css/index.css");
    }
    exec() {
      console.log("Site.");
    }
  };

  // src/routeDispatcher.ts
  var RouteDispatcher = class {
    constructor() {
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
      new Site().setup();
      const path = window.location.pathname;
      const HandlerClass = this.matchRoute(path);
      if (HandlerClass) {
        const handlerInstance = new HandlerClass();
        handlerInstance.setup();
      } else {
      }
    }
    execRoute() {
      new Site().exec();
      const path = window.location.pathname;
      const HandlerClass = this.matchRoute(path);
      if (HandlerClass) {
        const handlerInstance = new HandlerClass();
        handlerInstance.exec();
      } else {
      }
    }
  };
})();
//# sourceMappingURL=routeDispatcher.js.map
