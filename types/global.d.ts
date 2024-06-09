// global.d.ts
export interface WindowData {
    timely_categoryId: string;
    timely_productId: string;
    sbm_categoryId: string;
  }
  
  // Extend the Window interface to include the data property
// declare global {

  export interface Window {
    data: WindowData;
  }
//}
