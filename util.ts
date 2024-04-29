


/**
 * Estimates the due date using Naegele's rule 
 * @param lmp Date of last menstral period (LMP)
 * @returns 
 */
export function calculateEDDfromLMP(lmp: string): string {
    const date = new Date(lmp);
    date.setFullYear(date.getFullYear() + 1); // Add one year
    date.setMonth(date.getMonth() - 3); // Subtract three months
    date.setDate(date.getDate() + 7); // Add seven days

    return date.toISOString().split('T')[0]; // Return as YYYY-MM-DD
}

export function calculateLMPfromEDD(edd: string): string {
    const eddDate = new Date(edd);
    const daysInPregnancy = 280; // Standard gestation period of 40 weeks
    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    // Calculate the LMP by subtracting 280 days from the EDD
    const lmpDate = new Date(eddDate.getTime() - daysInPregnancy * millisecondsPerDay);

    // Return the LMP in YYYY-MM-DD format
    return lmpDate.toISOString().split('T')[0];
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