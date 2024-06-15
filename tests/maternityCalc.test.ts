import { fetchCSVData } from './csvData';
import { MaternityCalc } from '../src/maternityCalc';

/**
 * Unit Test Data 
 * https://docs.google.com/spreadsheets/d/1DREayEscT7YyWCNQQLSkHjeVFi5bON1KODZxTIJQEnk/edit#gid=0
 */

describe('MaternityCalc', () => {
  let sheetData: any[];

  beforeAll(async () => {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/1DREayEscT7YyWCNQQLSkHjeVFi5bON1KODZxTIJQEnk/export?format=csv';
    sheetData = await fetchCSVData(csvUrl);
//    console.log(sheetData); 
  });

  // https://www.stanfordchildrens.org/en/topic/default?id=due-date-calculator-41-DueDateCalc&DueDateCalc_Parameters=05-31-2024
  test('should create instance from LMP date correctly', () => {
    sheetData.forEach(row => {
      const lmp = new Date(row.LMP);
      const expectedEdd = new Date(row.EDD);
      const instance = MaternityCalc.createFromLMP(lmp);
      console.log("LMP", lmp.toLocaleDateString())
      expect(instance._edd.toISOString().split('T')[0])
        .toBe(expectedEdd.toISOString().split('T')[0]);
    });
  });

  test('should calculate LMP date correctly', () => {
    sheetData.forEach(row => {
      const edd = new Date(row.EDD);
      const expectedLmpDate = new Date(row.EDDtoLMP); 
      const maternityCalc = new MaternityCalc(edd);
      expect(maternityCalc.lmpDate.toISOString().split('T')[0]).toBe(expectedLmpDate.toISOString().split('T')[0]);
    });
  });

  // expect.extend({
  //   toBeWithDetails(received, expected, details) {
  //     const pass = received === expected;
  //     if (pass) {
  //       return {
  //         message: () => `expected ${received} not to be ${expected}`,
  //         pass: true,
  //       };
  //     } else {
  //       return {
  //         message: () => `expected ${received} to be ${expected}\nDetails: ${details}`,
  //         pass: false,
  //       };
  //     }
  //   },
  // });
  

  test('should calculate correct dayOf', () => {
    
    sheetData.forEach(row => {
      const edd = new Date(row.EDD);
      const today = new Date();  
//      const today = new Date(row.Today); 
      const expectedDayOf = parseInt(row.DayOf, 10);
      const maternityCalc = new MaternityCalc(edd);
//      jest.setSystemTime(today);

// const message = `EDD: ${edd.toLocaleDateString()}, Today: ${today.toLocaleDateString()}, Expected DayOf: ${expectedDayOf}`;

// if(maternityCalc.dayOf == expectedDayOf)
//   console.log(`Succeeded for ` + message); 
// else
//   console.error('Failed for ' + message); 

      expect(maternityCalc.dayOf).toBe(expectedDayOf);

//expect(maternityCalc.dayOf).toBeWithDetails(expectedDayOf, details);

      // try {
      //   expect(maternityCalc.dayOf).toBe(expectedDayOf);
      // } catch (error) {
      //   console.error(`Test failed for EDD: ${edd.toLocaleDateString()}, Today: ${today.toLocaleDateString()}, Expected DayOf: ${expectedDayOf}`);
      //   throw error;
      // }

    });
  });

  test('should calculate correct weekOf', () => {
    sheetData.forEach(row => {
      const edd = new Date(row.EDD);
      const today = new Date(); 
//      const today = new Date(row.Today); // Assuming today's date is in column named "Today"
      const expectedWeekOf = parseInt(row.WeekOf, 10); // Assuming expected weekOf is in column named "WeekOf"
      const maternityCalc = new MaternityCalc(edd);
      jest.setSystemTime(today);
      expect(maternityCalc.weekOf).toBe(expectedWeekOf);
    });
  });

});
