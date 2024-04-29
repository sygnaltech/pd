
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

/**
 * DEPENDENCIES
 * Flatpickr - https://flatpickr.js.org/
 */

// import { TocFix } from "../tocfix";
// import Plyr from 'plyr';
// // import QRCode from 'qrcode';
// import { AdjustTrackingUrl } from "../adjust";
// import { AdjustTrackingQr } from "../adjust-qr";

//const url: string = 'https://www.sygnal.com?thisisatrackingurlthsfdsfsdsdatdoesstuff';

import flatpickr from "flatpickr";
import { calculateEDDfromLMP } from "../../util";
import { Instance } from "flatpickr/dist/types/instance";


enum PageMode {
    Calc,
    Display
}

const QUERY_PARAM_EDD = "edd";
const ID_CALC_TIMELINE = "calc";
const ID_CALC_EDD = "calc-edd"; 

export class MaternityScanCalcPage {

    _mode: PageMode = PageMode.Calc;
    _edd: Date | null = null;

    _fpEDD: Instance | Instance[]; // = flatpickr("#edd", {});
    _fpLMP: Instance | Instance[];// = flatpickr("#lmp", {});

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
        const eddValue = searchParams.get(QUERY_PARAM_EDD);
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
         * Init
         */

        // const edd: Instance | Instance[]
        this._fpEDD = flatpickr("#edd", {});
        this._fpLMP = flatpickr("#lmp", {});




        /**
         * Handlers
         */

        const button = document.getElementById('calc-edd');
        button?.addEventListener('click', () => {




            const lmpInput = document.getElementById('lmp') as HTMLInputElement;
            if (lmpInput && lmpInput.value) {
                console.log("calc button clicked")
//                const lmpDate = new Date(lmpInput.value);
                const edd = calculateEDDfromLMP(lmpInput.value);
                console.log("calc button clicked", edd)
                const eddDate: Date = new Date(edd); 
//                const eddDate = calculateEDD(lmpDate);
                const formattedDate = eddDate.toISOString().split('T')[0];

                console.log(this._fpEDD);

                console.log(this._fpEDD);


                // Reload the page with the new query string
                window.location.href = `${window.location.pathname}?Edd=${formattedDate}`;
            }
        });

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

    
    
    
    