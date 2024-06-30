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
})();
//# sourceMappingURL=services.js.map
