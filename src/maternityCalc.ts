/*
 * SA5 Sygnal
 * Logic
 * 
 */





export class MaternityCalc {

    _edd: Date;

    constructor(edd: Date) {
      
      this._edd = edd;

    }

    getLmpDate(): Date {
      return this._edd;
    }

    getDayDate(day: number): Date {
      return this._edd;
    }

    getWeekStartDate(week: number): Date {
      return this._edd;
    }

    getWeekEndDate(week: number): Date {
      return this._edd;
    }

    init() {



    }

    static createFromLMP(lmp: Date) {

      return new MaternityCalc(lmp);

    }
    
}

