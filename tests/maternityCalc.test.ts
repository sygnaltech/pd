import fetchCSVData from './csvData';
import { MaternityCalc } from '../src/maternityCalc';

describe('MaternityCalc', () => {
  let sheetData: any[];

  beforeAll(async () => {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/1DREayEscT7YyWCNQQLSkHjeVFi5bON1KODZxTIJQEnk/export?format=csv';
    sheetData = await fetchCSVData(csvUrl);
    console.log(sheetData); 
  });

  test('should calculate LMP date correctly', () => {
    sheetData.forEach(row => {
      const edd = new Date(row.EDD); // Assuming EDD is in column named "EDD"
      const expectedLmpDate = new Date(row.LMP); // Assuming expected LMP is in column named "LMP"
      const maternityCalc = new MaternityCalc(edd);
      expect(maternityCalc.lmpDate.toISOString().split('T')[0]).toBe(expectedLmpDate.toISOString().split('T')[0]);
    });
  });

  test('should calculate correct dayOf', () => {
    sheetData.forEach(row => {
      const edd = new Date(row.EDD);
      const today = new Date(row.Today); // Assuming today's date is in column named "Today"
      const expectedDayOf = parseInt(row.DayOf, 10); // Assuming expected dayOf is in column named "DayOf"
      const maternityCalc = new MaternityCalc(edd);
      jest.setSystemTime(today);
      expect(maternityCalc.dayOf).toBe(expectedDayOf);
    });
  });

  test('should calculate correct weekOf', () => {
    sheetData.forEach(row => {
      const edd = new Date(row.EDD);
      const today = new Date(row.Today); // Assuming today's date is in column named "Today"
      const expectedWeekOf = parseInt(row.WeekOf, 10); // Assuming expected weekOf is in column named "WeekOf"
      const maternityCalc = new MaternityCalc(edd);
      jest.setSystemTime(today);
      expect(maternityCalc.weekOf).toBe(expectedWeekOf);
    });
  });

  test('should create instance from LMP date correctly', () => {
    sheetData.forEach(row => {
      const lmp = new Date(row.LMP); // Assuming LMP is in column named "LMP"
      const expectedEdd = new Date(row.EDD); // Assuming expected EDD is in column named "EDD"
      const instance = MaternityCalc.createFromLMP(lmp);
      expect(instance._edd.toISOString().split('T')[0]).toBe(expectedEdd.toISOString().split('T')[0]);
    });
  });
});
