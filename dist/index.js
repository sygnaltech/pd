(() => {
  // src/page/clinic.ts
  var ClinicPage = class {
    constructor() {
    }
    init() {
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
  var Rise = window["Site"];
  var init = () => {
    console.log("SITE package init v0.0.1");
    var routeDispatcher = new RouteDispatcher();
    routeDispatcher.routes = {
      "/": () => {
      },
      "/clinics/*": () => {
        new ClinicPage().init();
      }
    };
    console.log("loaded");
  };
  document.addEventListener("DOMContentLoaded", init);
})();
//# sourceMappingURL=index.js.map
