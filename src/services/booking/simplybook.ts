


//  declare function timelyButton(company: string, options: object): void;


export class SimplyBookService {

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

  }

// <script>new timelyButton("ponsonbydoctors", {"location":"244540","category":"397934","product":"3250333:SV","staff":"424054","style":"dark"});</script>

  bookService(categoryId: string | null, serviceId: string | null) {
    // const bookingButton = new timelyButton(
    //   this.account, {
    //     location: this.defaultLocationId,
    //     staff: this.defaultStaffId, 
    //     category: categoryId,
    //     product: serviceId,
    //     dontCreateButton: true
    // });

    // bookingButton.start();
  }

  static loadScript(): Promise<void> {

    // Check to see if it exists? install only if needed? 



    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
//      script.src = "//book.gettimely.com/widget/book-button-v1.3.js";
      script.src = "//book.gettimely.com/widget/book-button-v1.5.js";  
      script.id = 'timelyScript';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${script.src}`));
      document.head.appendChild(script);
    });
  }
  
}

