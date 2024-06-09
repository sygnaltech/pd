


declare function timelyButton(company: string, options: object): void;


export class TimelyService {

  account: string;
  defaultLocationId: string; // 247844  
  defaultProviderId: string;
  defaultCategoryId: string;
  defaultServiceId: string;

  constructor(account: string) {

    this.account = account; 

  }
  
  async init() {

    // console.log("adding timely script")
    // await this.loadTimelyScript(); 

  }

  bookService(categoryId: string | null, serviceId: string | null) {
    const bookingButton = new timelyButton('ponsonbydoctors', {
      category: categoryId,
        service: serviceId,
      dontCreateButton: true
  });

  bookingButton.start();
  }

  static loadTimelyScript(): Promise<void> {

    // Check to see if it exists? install only if needed? 

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = "//book.gettimely.com/widget/book-button-v1.3.js";
      script.id = 'timelyScript';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${script.src}`));
      document.head.appendChild(script);
    });
  }
  
}

