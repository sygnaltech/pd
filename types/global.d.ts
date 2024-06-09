// global.d.ts
interface WindowData {
    timely_categoryId: string;
    timely_productId: string;
    sbm_categoryId: string;
  }
  
  // Extend the Window interface to include the data property
// declare global {

  interface Window {
    data: WindowData;
  }
//}
