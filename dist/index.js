"use strict";
(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
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

  // src/page/clinic.ts
  var ClinicPage;
  var init_clinic = __esm({
    "src/page/clinic.ts"() {
      "use strict";
      ClinicPage = class {
        constructor() {
        }
        init() {
        }
      };
    }
  });

  // src/services/booking/timely.ts
  var TimelyService;
  var init_timely = __esm({
    "src/services/booking/timely.ts"() {
      "use strict";
      TimelyService = class {
        constructor(account) {
          this.account = account;
        }
        init() {
          return __async(this, null, function* () {
          });
        }
        bookService(categoryId, serviceId) {
          const bookingButton = new timelyButton("ponsonbydoctors", {
            category: categoryId,
            service: serviceId,
            dontCreateButton: true
          });
          bookingButton.start();
        }
        static loadTimelyScript() {
          return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "//book.gettimely.com/widget/book-button-v1.3.js";
            script.id = "timelyScript";
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load script: ${script.src}`));
            document.head.appendChild(script);
          });
        }
      };
    }
  });

  // src/util.ts
  function addEventListeners(selector, event, handler) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      element.addEventListener(event, handler);
    });
  }
  var init_util = __esm({
    "src/util.ts"() {
      "use strict";
    }
  });

  // src/page/services.ts
  var ServicesPage;
  var init_services = __esm({
    "src/page/services.ts"() {
      "use strict";
      init_timely();
      init_util();
      ServicesPage = class {
        constructor() {
          this.timely = new TimelyService("ponsonbydoctors");
        }
        init() {
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
    }
  });

  // src/routeDispatcher.ts
  var RouteDispatcher;
  var init_routeDispatcher = __esm({
    "src/routeDispatcher.ts"() {
      "use strict";
      RouteDispatcher = class {
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
    }
  });

  // src/site.ts
  var Site;
  var init_site = __esm({
    "src/site.ts"() {
      "use strict";
      Site = class {
        constructor() {
        }
        init() {
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
    }
  });

  // src/version.ts
  var VERSION;
  var init_version = __esm({
    "src/version.ts"() {
      "use strict";
      VERSION = "0.1.2";
    }
  });

  // src/index.ts
  var require_src = __commonJS({
    "src/index.ts"(exports) {
      init_clinic();
      init_services();
      init_routeDispatcher();
      init_timely();
      init_site();
      init_version();
      var SITE_NAME = "Site";
      var init = () => __async(exports, null, function* () {
        console.log(`%c${SITE_NAME} package init ${VERSION}`, "color: blue;");
        new Site().init();
        yield TimelyService.loadTimelyScript();
        var routeDispatcher = new RouteDispatcher();
        routeDispatcher.routes = {
          "/": () => {
          },
          "/services/*": () => {
            new ServicesPage().init();
          },
          "/clinics/*": () => {
            new ClinicPage().init();
          }
        };
        routeDispatcher.dispatchRoute();
      });
      document.addEventListener("DOMContentLoaded", init);
    }
  });
  require_src();
})();
//# sourceMappingURL=index.js.map
