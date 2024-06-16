/*
 * SITE 
 * Maternity Calc
 * 
 */

import { DateTime } from 'luxon';

// Standard gestation period of 40 weeks
const DAYS_IN_PREGNANCY = 280;

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export class MaternityCalc {

    _edd: Date;

    constructor(edd: Date) {
      
      this._edd = edd;

    }
    
    // Gestational Age
    // This is the age of the pregnancy calculated from the first day of the LMP. This method assumes a standard 28-day menstrual cycle and a 40-week pregnancy duration (280 days).
    get lmpDate(): Date {

      const eddDate = new Date(this._edd);
  
      // Calculate the LMP by subtracting 280 days from the EDD
      const lmpDate = new Date(
        eddDate.getTime() - DAYS_IN_PREGNANCY * MS_PER_DAY
      );
  
      return lmpDate;
    }

    // Embryonic Age
    // This is the actual age of the embryo, which is approximately 2 weeks less than the gestational age, as it starts counting from the time of conception, which usually occurs about 2 weeks after the LMP.
    get conceptionDate(): Date {
      const lmpDate = new Date(this.lmpDate);
  
      // Calculate the LMP by subtracting 280 days from the EDD
      const conceptionDate = new Date(
        lmpDate.getTime() + 14 * MS_PER_DAY
      );

      return conceptionDate;
    }

    // 1-based
    get dayOf(): number {

      // Get the current date in the user's local timezone, 
      // normalized to the start of the day
      const today = DateTime.local().startOf('day'); 

      const eddDate = DateTime.fromJSDate(this.lmpDate).startOf('day'); 

      const diffDays = Math.ceil(today.diff(eddDate, 'days').days);

      return diffDays + 1;
  }
  

    // 1-based
    get weekOf(): number {

      const weeks = Math.floor(this.dayOf / 7);

      return weeks + 1; 
    }

    // getDayDate(day: number): Date {
    //   return this._edd;
    // }

    // getWeekStartDate(week: number): Date {
    //   return this._edd;
    // }

    // getWeekEndDate(week: number): Date {
    //   return this._edd;
    // }

    getDayDate(day: number): Date {
        const lmpDate = DateTime.fromJSDate(this.lmpDate)
          .startOf('day');
        const dayDate = lmpDate.plus({ days: day - 1 });
//          .toJSDate();
        return MaternityCalc.convertToJSDate(dayDate);
    }

    getWeekStartDate(week: number): Date {
        const lmpDate = DateTime.fromJSDate(this.lmpDate)
          .startOf('day');
        const weekStartDate = lmpDate.plus({ weeks: week - 1 })
          .startOf('day'); 
        return MaternityCalc.convertToJSDate(weekStartDate);
    }

    getWeekEndDate(week: number): Date {
        const lmpDate = DateTime.fromJSDate(this.lmpDate)
          .startOf('day');
        const weekEndDate = lmpDate
          .plus({ weeks: week - 1, days: 6 })
          .startOf('day');
        return MaternityCalc.convertToJSDate(weekEndDate);
    }

    /**
     * Estimates the due date using +280 rule 
     * @param lmp Date of last menstral period (LMP)
     * @returns MaternityCalc instance
     */
    static createFromLMP(lmp: Date): MaternityCalc {

      const lmpDate = DateTime.fromJSDate(lmp); 

      let eddDate = lmpDate.plus({ days: 280 });

      const eddJSDate = this.convertToJSDate(eddDate); 
//      const eddJSDate = new Date(`${eddDate.year}-${String(eddDate.month).padStart(2, '0')}-${String(eddDate.day).padStart(2, '0')}`);

      return new MaternityCalc(eddJSDate);
    }

    static convertToJSDate(dateTime: DateTime): Date {
      return new Date(`${dateTime.year}-${String(dateTime.month).padStart(2, '0')}-${String(dateTime.day).padStart(2, '0')}`);
    }

    /**
     * Estimates the due date using Naegele's rule 
     * @param lmp Date of last menstral period (LMP)
     * @returns MaternityCalc instance
     */
    static createFromLMPNaegele(lmp: Date): MaternityCalc {

      const lmpDate = DateTime.fromJSDate(lmp); 

      // Naegele's rule
      const eddDate = lmpDate
        .plus({ years: 1 }) // Add one year
        .minus({ months: 3 }) // Subtract three months
        .plus({ days: 7 }) // Add seven days
        .startOf('day'); 

      const eddJSDate = new Date(`${eddDate.year}-${String(eddDate.month).padStart(2, '0')}-${String(eddDate.day).padStart(2, '0')}`);

      return new MaternityCalc(eddJSDate);
    }

}

