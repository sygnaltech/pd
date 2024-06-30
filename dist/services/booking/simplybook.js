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

  // src/services/booking/simplybook.ts
  var SimplyBookService = class {
    constructor(account) {
      this.account = account;
    }
    init() {
      return __async(this, null, function* () {
      });
    }
    bookService(categoryId, serviceId) {
    }
    static loadScript() {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "//book.gettimely.com/widget/book-button-v1.5.js";
        script.id = "timelyScript";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${script.src}`));
        document.head.appendChild(script);
      });
    }
  };
})();
//# sourceMappingURL=simplybook.js.map
