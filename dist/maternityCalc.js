(() => {
  // src/maternityCalc.ts
  var MaternityCalc = class {
    constructor(edd) {
      this._edd = edd;
    }
    getLmpDate() {
      return this._edd;
    }
    getDayDate(day) {
      return this._edd;
    }
    getWeekStartDate(week) {
      return this._edd;
    }
    getWeekEndDate(week) {
      return this._edd;
    }
    init() {
    }
    static createFromLMP(lmp) {
      return new MaternityCalc(lmp);
    }
  };
})();
//# sourceMappingURL=maternityCalc.js.map
