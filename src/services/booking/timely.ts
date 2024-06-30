import { Page } from "@sygnal/sse";
import { ScriptElement } from "@sygnal/sse/dist/script";



// declare function timelyButton(company: string, options: object): void;
declare class timelyButton {
  constructor(company: string, options: object);
  start(): void;
}


export class TimelyService {

  account: string;
  defaultLocationId?: string; // 247844  
  defaultStaffId?: string;
  defaultCategoryId?: string;
  defaultServiceId?: string;

  constructor(account: string) {

    this.account = account; 

  }
  
  async init() {

    // console.log("adding timely script")
    // await this.loadTimelyScript(); 

    // Page.loadScript("//book.gettimely.com/widget/book-button-v1.5.js"); 
    // Page.Head.loadScript("//book.gettimely.com/widget/book-button-v1.5.js", { id: "timelyScript" });

// Page.Body.loadScript()

    // const timelyScript = new ScriptElement("//book.gettimely.com/widget/book-button-v1.5.js");
    // timelyScript.id = "timelyScript";
    // timelyScript.appendTo('head');

  }

// <script>new timelyButton("ponsonbydoctors", {"location":"244540","category":"397934","product":"3250333:SV","staff":"424054","style":"dark"});</script>

  bookService(categoryId: string | null, serviceId: string | null) {
    const bookingButton = new timelyButton(
      this.account, {
        location: this.defaultLocationId,
        staff: this.defaultStaffId, 
        category: categoryId,
        product: serviceId,
        dontCreateButton: true
    });

    bookingButton.start();
  }

//   static loadTimelyScript(): Promise<void> {

//     // Check to see if it exists? install only if needed? 



//     return new Promise((resolve, reject) => {
//       const script = document.createElement('script');
// //      script.src = "//book.gettimely.com/widget/book-button-v1.3.js";
//       script.src = "//book.gettimely.com/widget/book-button-v1.5.js";  
//       script.id = 'timelyScript';
//       script.onload = () => resolve();
//       script.onerror = () => reject(new Error(`Failed to load script: ${script.src}`));
//       document.head.appendChild(script);
//     });
//   }
  
}

