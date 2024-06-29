"use strict";
(() => {
  // node_modules/@sygnal/sse/dist/debug.js
  var DEFAULT_APP_NAME = "Site";
  var Debug = class {
    get persistentDebug() {
      return Boolean(localStorage.getItem(this._localStorageDebugFlag));
    }
    set persistentDebug(active) {
      if (active) {
        localStorage.setItem(this._localStorageDebugFlag, "true");
        console.debug(`${this._appName} debug enabled (persistent).`);
      } else {
        localStorage.removeItem(this._localStorageDebugFlag);
        console.debug(`${this._appName} debug disabled (persistent).`);
      }
    }
    get enabled() {
      var wfuDebugValue = Boolean(localStorage.getItem(this._localStorageDebugFlag));
      wfuDebugValue = wfuDebugValue || this._enabled;
      return wfuDebugValue;
    }
    set enabled(active) {
      this._enabled = active;
    }
    constructor(label, appName = DEFAULT_APP_NAME) {
      this._localStorageDebugFlag = "debug-mode";
      this._appName = DEFAULT_APP_NAME;
      this._enabled = false;
      this._appName = appName;
      this._label = label;
    }
    group(name) {
      if (this.enabled)
        console.group(name);
    }
    groupEnd() {
      if (this.enabled)
        console.groupEnd();
    }
    debug(...args) {
      if (this.enabled)
        console.debug(this._label, ...args);
    }
  };

  // node_modules/js-cookie/dist/js.cookie.mjs
  function assign(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        target[key] = source[key];
      }
    }
    return target;
  }
  var defaultConverter = {
    read: function(value) {
      if (value[0] === '"') {
        value = value.slice(1, -1);
      }
      return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
    },
    write: function(value) {
      return encodeURIComponent(value).replace(
        /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
        decodeURIComponent
      );
    }
  };
  function init(converter, defaultAttributes) {
    function set(name, value, attributes) {
      if (typeof document === "undefined") {
        return;
      }
      attributes = assign({}, defaultAttributes, attributes);
      if (typeof attributes.expires === "number") {
        attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
      }
      if (attributes.expires) {
        attributes.expires = attributes.expires.toUTCString();
      }
      name = encodeURIComponent(name).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
      var stringifiedAttributes = "";
      for (var attributeName in attributes) {
        if (!attributes[attributeName]) {
          continue;
        }
        stringifiedAttributes += "; " + attributeName;
        if (attributes[attributeName] === true) {
          continue;
        }
        stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
      }
      return document.cookie = name + "=" + converter.write(value, name) + stringifiedAttributes;
    }
    function get(name) {
      if (typeof document === "undefined" || arguments.length && !name) {
        return;
      }
      var cookies = document.cookie ? document.cookie.split("; ") : [];
      var jar = {};
      for (var i = 0; i < cookies.length; i++) {
        var parts = cookies[i].split("=");
        var value = parts.slice(1).join("=");
        try {
          var found = decodeURIComponent(parts[0]);
          jar[found] = converter.read(value, found);
          if (name === found) {
            break;
          }
        } catch (e) {
        }
      }
      return name ? jar[name] : jar;
    }
    return Object.create(
      {
        set,
        get,
        remove: function(name, attributes) {
          set(
            name,
            "",
            assign({}, attributes, {
              expires: -1
            })
          );
        },
        withAttributes: function(attributes) {
          return init(this.converter, assign({}, this.attributes, attributes));
        },
        withConverter: function(converter2) {
          return init(assign({}, this.converter, converter2), this.attributes);
        }
      },
      {
        attributes: { value: Object.freeze(defaultAttributes) },
        converter: { value: Object.freeze(converter) }
      }
    );
  }
  var api = init(defaultConverter, { path: "/" });

  // src/sa5/logic.ts
  var SA5Logic = class {
    constructor() {
    }
    init() {
      var elements;
      elements = document.querySelectorAll("[wfu-logic-if]");
      elements.forEach((element) => {
        new SA5LogicIf(element).init();
      });
      elements = document.querySelectorAll("[wfu-logic-switch]");
      elements.forEach((element) => {
        new SA5LogicSwitch(element).init();
      });
    }
  };
  var SA5LogicIf = class {
    constructor(elem) {
      this._data = {};
      this._elem = elem;
      this.debug = new Debug("SA5 Logic");
    }
    init() {
      console.log("SA5 logic IF ");
      const dataAttributes = this._elem.attributes;
      for (let i = 0; i < dataAttributes.length; i++) {
        const attr = dataAttributes[i];
        const attrName = attr.name.toLowerCase();
        if (attrName.startsWith("wfu-logic-param-")) {
          const key = attrName.slice("wfu-logic-param-".length);
          this._data[key] = attr.value !== "" ? attr.value : null;
        }
      }
      console.log();
      const descendants = this._elem.querySelectorAll("[wfu-logic-if-display]");
      descendants.forEach((descendant) => {
        const condition = descendant.getAttribute("wfu-logic-if-display");
        const shouldDisplay = this.evaluateCondition(condition, this._data);
        if (shouldDisplay) {
          descendant.style.display = "";
        } else {
          descendant.style.display = "none";
        }
      });
      this._elem.removeAttribute("wfu-preload");
    }
    evaluateCondition(condition, context) {
      try {
        return new Function("with(this) { return " + condition + "; }").call(context);
      } catch (e) {
        console.error("Error evaluating condition:", condition, e);
        return false;
      }
    }
  };
  var SA5LogicSwitch = class {
    constructor(elem) {
      this._elem = elem;
      this.debug = new Debug("SA5 Logic");
      this._val = elem.getAttribute("wfu-logic-switch");
    }
    init() {
      console.log("SA5 logic SWITCH ");
      console.log();
      const descendants = this._elem.querySelectorAll("[wfu-logic-switch-case]");
      descendants.forEach((descendant) => {
        const condition = descendant.getAttribute("wfu-logic-switch-case");
        const shouldDisplay = this.evaluateCondition(condition, this._val);
        if (shouldDisplay) {
          descendant.style.display = "";
        } else {
          descendant.style.display = "none";
        }
      });
      this._elem.removeAttribute("wfu-preload");
    }
    evaluateCondition(condition, context) {
      try {
        return condition == context;
      } catch (e) {
        console.error("Error evaluating condition:", condition, e);
        return false;
      }
    }
  };

  // src/page/test-wfu-if.ts
  var TestWfuIfPage = class {
    constructor() {
    }
    setup() {
    }
    exec() {
      console.log("Test Wfu If.");
      new SA5Logic().init();
    }
  };
})();
/*! js-cookie v3.0.5 | MIT */
//# sourceMappingURL=test-wfu-if.js.map
