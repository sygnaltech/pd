/*
 * SITE 
 * Maternity Calc
 * 
 */


// Standard gestation period of 40 weeks
const DAYS_IN_PREGNANCY = 280;

export class MaternityCalc {

    _edd: Date;

    constructor(edd: Date) {
      
      this._edd = edd;

    }
    
    get lmpDate(): Date {

      const eddDate = new Date(this._edd);
      const millisecondsPerDay = 1000 * 60 * 60 * 24;
  
      // Calculate the LMP by subtracting 280 days from the EDD
      const lmpDate = new Date(eddDate.getTime() - DAYS_IN_PREGNANCY * millisecondsPerDay);
  
      return lmpDate;
    }

    // 1-based
    get dayOf(): number {
        // Calculate the difference between the LMP and today
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - this.lmpDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays + 1; 
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

      const date = new Date(lmp);
      date.setFullYear(date.getFullYear() + 1); // Add one year
      date.setMonth(date.getMonth() - 3); // Subtract three months
      date.setDate(date.getDate() + 7); // Add seven days

      return new MaternityCalc(date);
    }
    
}

