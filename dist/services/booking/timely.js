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
})();
//# sourceMappingURL=timely.js.map
