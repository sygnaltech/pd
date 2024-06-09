
/*
 * SITE 
 * Page | Services 
 * 
 */

// import { TocFix } from "../tocfix";
// import Plyr from 'plyr';
// // import QRCode from 'qrcode';
// import { AdjustTrackingUrl } from "../adjust";
// import { AdjustTrackingQr } from "../adjust-qr";

//const url: string = 'https://www.sygnal.com?thisisatrackingurlthsfdsfsdsdatdoesstuff';

// interface WindowData {
//     timely_categoryId: string;
//     timely_productId: string;
//     sbm_categoryId: string;
//   }
  
//   // Extend the Window interface to include the data property
//   interface Window {
//     data: WindowData;
//   }

  declare function timelyButton(company: string, options: object): void;

//   declare global {
//     interface Window {
//         data: WindowData;
//     }
// }


export class ServicesPage {

    constructor() {
    }
    
    init() {

        // await loadTimelyScript('//book.gettimely.com/widget/book-button-v1.5.js');

        if (!window.data) {
            console.error ("Window.data is not available.");
            return;
        }

console.log("setting up buttons")

// Timely
var bookingButtonInClinic = new timelyButton('ponsonbydoctors', {
    // "location": "247844", 
    "category": window.data.timely_categoryId,
    "dontCreateButton": true
  });  

  var bookingButtonInClinicService = new timelyButton('ponsonbydoctors', {
    // "location": "247844", 
    "category": window.data.timely_categoryId,
    "product": window.data.timely_productId,
    "dontCreateButton": true
  });  

  var bookingButtonOnline = new timelyButton('ponsonbydoctors', {
    // "location": "247844", 
    "category": "", // TimelyCategoryIDOnline
    "dontCreateButton": true
  });         

  var bookingButtonOnlineService = new timelyButton('ponsonbydoctors', {
    // "location": "247844", 
    "category": "", // TimelyCategoryIDOnline
    "product": "", // TimelyServiceIDOnline
    "dontCreateButton": true
  });      
                 
  

// Add click event listener to elements with attribute [timely="book"]
this.addEventListeners('*[timely="book"]', 'click', function (this: HTMLElement, e: Event) {
    const categoryId = this.getAttribute('categoryId');
    const serviceId = this.getAttribute('serviceId');
    
    const bookingButton = new timelyButton('ponsonbydoctors', {
      category: categoryId,
      service: serviceId,
      dontCreateButton: true
    });
  
    bookingButton.start();
  });
  
  // Add click event listener to elements with attribute [timely="ponsonby"]
  this.addEventListeners('*[timely="ponsonby"]', 'click', function () {
    bookingButtonInClinic.start();
  });
  
  // Add click event listener to elements with attribute [timely="ponsonby-service"]
  this.addEventListeners('*[timely="ponsonby-service"]', 'click', function () {
    bookingButtonInClinicService.start();
  });
  
  // Add click event listener to elements with attribute [timely="online"]
  this.addEventListeners('*[timely="online"]', 'click', function () {
    bookingButtonOnline.start();
  });
  
  // Add click event listener to elements with attribute [timely="online-service"]
  this.addEventListeners('*[timely="online-service"]', 'click', function () {
    bookingButtonOnlineService.start();
  });
  
  // Auto-booking based on URL parameter
  if (window.location.search.includes('action=book')) {
    bookingButtonInClinic.start();
  }




    }

// Utility function to add event listeners to elements
 addEventListeners(selector: string, event: string, handler: (e: Event) => void) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => {
    element.addEventListener(event, handler);
  });
}
}  

    
    
    
    