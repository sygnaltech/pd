(() => {
  // src/maternityCalc.ts
  var DAYS_IN_PREGNANCY = 280;
  var MaternityCalc = class {
    constructor(edd) {
      this._edd = edd;
    }
    get lmpDate() {
      const eddDate = new Date(this._edd);
      const millisecondsPerDay = 1e3 * 60 * 60 * 24;
      const lmpDate = new Date(eddDate.getTime() - DAYS_IN_PREGNANCY * millisecondsPerDay);
      return lmpDate;
    }
    get dayOf() {
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - this.lmpDate.getTime());
      const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
      return diffDays + 1;
    }
    get weekOf() {
      const weeks = Math.floor(this.dayOf / 7);
      return weeks + 1;
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
    static createFromLMP(lmp) {
      const date = new Date(lmp);
      date.setFullYear(date.getFullYear() + 1);
      date.setMonth(date.getMonth() - 3);
      date.setDate(date.getDate() + 7);
      return new MaternityCalc(date);
    }
  };
})();
//# sourceMappingURL=maternityCalc.js.map
