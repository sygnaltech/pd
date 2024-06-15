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
    
    // Gestational Age: This is the age of the pregnancy calculated from the first day of the LMP. This method assumes a standard 28-day menstrual cycle and a 40-week pregnancy duration (280 days).
    get lmpDate(): Date {

      const eddDate = new Date(this._edd);
  
      // Calculate the LMP by subtracting 280 days from the EDD
      const lmpDate = new Date(
        eddDate.getTime() - DAYS_IN_PREGNANCY * MS_PER_DAY
      );
  
      return lmpDate;
    }

    // Embryonic Age: This is the actual age of the embryo, which is approximately 2 weeks less than the gestational age, as it starts counting from the time of conception, which usually occurs about 2 weeks after the LMP.
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

      // const today = DateTime.local().startOf('day'); // Get the current date in the user's local timezone, normalized to the start of the day
      // const eddDate = DateTime.fromJSDate(this._edd).startOf('day'); // Convert _edd to Luxon DateTime and normalize to start of day
      // const diffDays = Math.ceil(today.diff(eddDate, 'days').days);
      // return diffDays + 1;

      // Normalize the dates to remove the time portion
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set the time of today to midnight
  
      const lmpDate = new Date(this.lmpDate);
      lmpDate.setHours(0, 0, 0, 0); // Set the time of lmpDate to midnight

      // Calculate the difference in time between the normalized dates
      const diffTime = Math.abs(today.getTime() - lmpDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      // console.log("dayOf", 
      //   today.toLocaleDateString(), 
      //   lmpDate.toLocaleDateString(),
      //   diffDays
      // );
  
      return diffDays;
  }
  

    // 1-based
    get weekOf(): number {

      const weeks = Math.floor(this.dayOf / 7);

      return weeks + 1; 
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

    /**
     * Estimates the due date using Naegele's rule 
     * @param lmp Date of last menstral period (LMP)
     * @returns MaternityCalc Instance
     */
    static createFromLMP(lmp: Date): MaternityCalc {

      const lmpDate = DateTime.fromJSDate(lmp); //.startOf('day'); // Convert JS Date to Luxon DateTime and normalize to start of day

      console.log("Incoming LMP:", lmpDate.toISO());
      // const eddDate = lmpDate
      // .plus({ years: 1 }) // Add one year
      // .minus({ months: 3 }) // Subtract three months
      // .plus({ days: 7 }) // Add seven days
      // .startOf('day'); 

      // https://moment.github.io/luxon/#/math
      let eddDate = lmpDate.plus({ years: 1 }); // Add one year
      eddDate = eddDate.minus({ months: 3 }); // Subtract three months
      eddDate = eddDate.plus({ days: 7 }); // Add seven days
//      eddDate = eddDate.startOf('day'); // Ensure we are at the start of the day (midnight)
  

    console.log("LMP + 1 year - 3 months + 7 days:", eddDate.toISO());

// //    const eddJSDate = new Date(eddDate.year, eddDate.month - 1, eddDate.day);
//     // Extract the year, month, and day from the Luxon DateTime object
//     const { year, month, day } = eddDate.toObject();
//     if (year === undefined || month === undefined || day === undefined) {
//       throw new Error("Invalid date parts from Luxon DateTime object");
//     }    // Create a JavaScript Date object using the extracted parts
//     const eddJSDate = new Date(year, month - 1, day);

    const eddJSDate = new Date(`${eddDate.year}-${String(eddDate.month).padStart(2, '0')}-${String(eddDate.day).padStart(2, '0')}`);


      console.log("Breakdown\r\n" + 
        `LMP: ${lmpDate.toISO()}\r\n` +
        `LMP + 1 year: ${lmpDate.plus({ years: 1 }).toISO()}\r\n` +
        `LMP - 3 months: ${lmpDate.plus({ years: 1 }).minus({ months: 3 }).toISO()}\r\n` +
        `EDD: ${eddDate.toISO()}\r\n` +
        `AsJS: ${eddJSDate.toISOString()}`
      )


      return new MaternityCalc(eddJSDate);
//    return new MaternityCalc(eddDate.toJSDate());

//       const date = new Date(lmp);
// //      date.setHours(0, 0, 0, 0); // Set the time of today to midnight

//       console.log("LMP", date);
//       date.setFullYear(date.getFullYear() + 1); // Add one year
//       console.log("LMP + 1 year", date);
//       date.setMonth(date.getMonth() - 3); // Subtract three months
//       console.log("LMP - 3 months", date);
//       date.setDate(date.getDate() + 7); // Add seven days
//       console.log("LMP + 7 days", date);


//       return new MaternityCalc(date);
    }
    
}

