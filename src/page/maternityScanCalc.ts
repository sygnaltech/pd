
/*
 * SITE 
 * Page | Maternity Scan Calculator 
 * 
 * - Calculate EDD, and call page
 * - If EDD passed in as param, new mode
 * - Calculate scan dates list 
 *    - Show past
 *    - Current ( and date to book before )
 *    - Upcoming ( and earliest date to book )
 */

// import { TocFix } from "../tocfix";
// import Plyr from 'plyr';
// // import QRCode from 'qrcode';
// import { AdjustTrackingUrl } from "../adjust";
// import { AdjustTrackingQr } from "../adjust-qr";

//const url: string = 'https://www.sygnal.com?thisisatrackingurlthsfdsfsdsdatdoesstuff';



enum PageMode {
    Calc,
    Display
}

const PARAM_EDD = "edd";

export class MaternityScanCalcPage {

    _mode: PageMode = PageMode.Calc;
    _edd: Date | null = null;

    constructor() {
    }
    
    init() {

        // Create a URL object from the current location
        const currentUrl = new URL(window.location.href);
    
        // Access the URL's search parameters
        const searchParams = new URLSearchParams(currentUrl.search);

        /**
         * Determine Page Mode
         */

        // If querystrying ?edd, mode is display
        // else mode is calc 
        this._mode = PageMode.Calc;
        const eddValue = searchParams.get(PARAM_EDD);
        if (eddValue) {
            const parsedDate = new Date(eddValue);
            if (!isNaN(parsedDate.getTime())) {
                this._mode = PageMode.Display;
                this._edd = parsedDate;
            } else {
                console.error('Invalid date format:', eddValue);
            }
        }

        /**
         * Hide/show areas
         * Mode Display
         *   - show display area
         *   - calc display area 
         */

        // let tocFix = new TocFix();
        // tocFix.init(); 

//         window['fsAttributes'] = window['fsAttributes'] || [];
//         window['fsAttributes'].push([
//           'toc',
//           (tableInstances) => {

//             tocFix.addToCCloseLinks();

// //            console.log('toc Successfully loaded!');
//           },
//         ]);

//         /**
//          * Wire up components embedded
//          * in Finsweet PRT RTB's
//          */

//         window['fsAttributes'] = window['fsAttributes'] || []; 
//         window['fsAttributes'].push([  
//           'richtext',   
//           (textInstances) => {   

//             this.initAfterFsPRTLib();
// //            console.log('richtext Successfully loaded!');      
//           },   
//         ]);    


        // // Look for all links with a [code] attribute
        // // and apply it to the link's querystring as ?code=VALUE. 

        // // Get all links with the 'code' attribute
        // const links: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('a[code]');

        // links.forEach((link: HTMLAnchorElement) => {
        //     // Get the value of the 'code' attribute
        //     const codeValue: string = link.getAttribute('code') || '';

        //     // Use the URL interface to handle the href
        //     const url: URL = new URL(link.href);
            
        //     // Use URLSearchParams to set the code parameter
        //     url.searchParams.set('code', codeValue);

        //     // Update the link href
        //     link.href = url.toString();
        // });
                    
    }

}  

    
    
    
    