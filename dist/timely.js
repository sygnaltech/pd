"use strict";
(() => {
  // src/timely.ts
  function loadTimelyScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.id = "timelyScript";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
    });
  }
})();
//# sourceMappingURL=timely.js.map
