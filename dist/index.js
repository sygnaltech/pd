"use strict";
(() => {
  // src/page/clinic.ts
  var ClinicPage = class {
    constructor() {
    }
    init() {
    }
  };

  // src/page/services.ts
  var ServicesPage = class {
    constructor() {
    }
    init() {
      if (!window.data) {
        console.error("Window.data is not available.");
        return;
      }
      console.log("setting up buttons");
      var bookingButtonInClinic = new timelyButton("ponsonbydoctors", {
        "category": window.data.timely_categoryId,
        "dontCreateButton": true
      });
      var bookingButtonInClinicService = new timelyButton("ponsonbydoctors", {
        "category": window.data.timely_categoryId,
        "product": window.data.timely_productId,
        "dontCreateButton": true
      });
      var bookingButtonOnline = new timelyButton("ponsonbydoctors", {
        "category": "",
        "dontCreateButton": true
      });
      var bookingButtonOnlineService = new timelyButton("ponsonbydoctors", {
        "category": "",
        "product": "",
        "dontCreateButton": true
      });
      this.addEventListeners('*[timely="book"]', "click", function(e) {
        const categoryId = this.getAttribute("categoryId");
        const serviceId = this.getAttribute("serviceId");
        const bookingButton = new timelyButton("ponsonbydoctors", {
          category: categoryId,
          service: serviceId,
          dontCreateButton: true
        });
        bookingButton.start();
      });
      this.addEventListeners('*[timely="ponsonby"]', "click", function() {
        bookingButtonInClinic.start();
      });
      this.addEventListeners('*[timely="ponsonby-service"]', "click", function() {
        bookingButtonInClinicService.start();
      });
      this.addEventListeners('*[timely="online"]', "click", function() {
        bookingButtonOnline.start();
      });
      this.addEventListeners('*[timely="online-service"]', "click", function() {
        bookingButtonOnlineService.start();
      });
      if (window.location.search.includes("action=book")) {
        bookingButtonInClinic.start();
      }
    }
    addEventListeners(selector, event, handler) {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        element.addEventListener(event, handler);
      });
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

  // src/site.ts
  var Site = class {
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

  // src/version.ts
  var VERSION = "0.1.2";

  // src/index.ts
  var SITE_NAME = "Site";
  var init = () => {
    console.log(`%c${SITE_NAME} package init ${VERSION}`, "color: blue;");
    new Site().init();
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
  };
  document.addEventListener("DOMContentLoaded", init);
})();
//# sourceMappingURL=index.js.map
