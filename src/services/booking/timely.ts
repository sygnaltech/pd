

export class TimelyService {

  constructor() {
  }
  
  async init() {

    console.log("adding timely script")
    await this.loadTimelyScript(); 

  }

  private loadTimelyScript(): Promise<void> {

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

