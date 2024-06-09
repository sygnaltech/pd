"use strict";
(() => {
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
})();
//# sourceMappingURL=site.js.map
