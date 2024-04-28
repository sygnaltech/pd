(() => {
  // src/page/maternityScanCalc.ts
  var PARAM_EDD = "edd";
  var MaternityScanCalcPage = class {
    constructor() {
      this._mode = 0 /* Calc */;
      this._edd = null;
    }
    init() {
      const currentUrl = new URL(window.location.href);
      const searchParams = new URLSearchParams(currentUrl.search);
      this._mode = 0 /* Calc */;
      const eddValue = searchParams.get(PARAM_EDD);
      if (eddValue) {
        const parsedDate = new Date(eddValue);
        if (!isNaN(parsedDate.getTime())) {
          this._mode = 1 /* Display */;
          this._edd = parsedDate;
        } else {
          console.error("Invalid date format:", eddValue);
        }
      }
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
    dispatchRoute() {
      const path = window.location.pathname;
      const handler = this.matchRoute(path);
      if (handler) {
        handler();
      } else {
        console.log("No specific function for this path.");
      }
    }
  };

  // src/index.ts
  window["Site"] = window["Site"] || {};
  var Site = window["Site"];
  var init = () => {
    console.log("SITE package init v0.0.1");
    var routeDispatcher = new RouteDispatcher();
    routeDispatcher.routes = {
      "/": () => {
      },
      "/maternity": () => {
        new MaternityScanCalcPage().init();
      }
    };
    console.log("loaded");
  };
  document.addEventListener("DOMContentLoaded", init);
})();
//# sourceMappingURL=index.js.map
