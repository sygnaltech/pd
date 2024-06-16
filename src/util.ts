import { MaternityCalc } from "./maternityCalc";


// Formats as ISO8601 Date format YYYY-MM-DD 
export function formatISODate(date: Date): string {
    return date.toISOString().split('T')[0];
}

/**
 * Estimates the due date using Naegele's rule 
 * @param lmp Date of last menstral period (LMP)
 * @returns 
 */
// export function calculateEDDfromLMP(lmp: string): Date {

//     const maternityCalc: MaternityCalc = MaternityCalc.createFromLMP(new Date(lmp)); 

//     return maternityCalc._edd; 
// }

export function calculateLMPfromEDD(edd: string): Date {

    const maternityCalc: MaternityCalc = new MaternityCalc(new Date(edd)); 

    return maternityCalc.lmpDate;
}


// Example usage
// const lmp = '2023-09-14';
// const dueDate = calculateDueDate(lmp);
// console.log('Estimated Due Date:', dueDate);


function calculatePregnancyWeek(lmp: string): number {
    const lmpDate = new Date(lmp);
    const todayDate = new Date();
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const daysDifference = Math.floor((todayDate.getTime() - lmpDate.getTime()) / millisecondsPerDay);
    const currentWeek = Math.floor(daysDifference / 7);

    return currentWeek;
}


// Example usage
// const lmp = '2023-02-01'; // An example last menstrual period date
// const currentWeek = calculatePregnancyWeek(lmp);
// console.log('Current week of pregnancy:', currentWeek);