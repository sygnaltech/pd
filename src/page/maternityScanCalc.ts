
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
import { IModule } from "../IModule";


enum PageMode {
    Calc,
    Display
}

const QUERY_PARAM_EDD = "edd";
const ID_CALC_TIMELINE = "calc";
const ID_CALC_EDD = "calc-edd"; 

export class MaternityScanCalcPage implements IModule {

    _mode: PageMode = PageMode.Calc;
    _edd: Date | null = null;

    // _fpEDD: Instance | Instance[]; // = flatpickr("#edd", {});
    // _fpLMP: Instance | Instance[];// = flatpickr("#lmp", {});
    _fpEDD: flatpickr.Instance; // Assuming you're using the flatpickr instance type
    _fpLMP: flatpickr.Instance; // Assuming you're using the flatpickr instance type

    constructor() { 
    }
    
    preInit() {

//       <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">

    }

    init() {

        // Create a URL object from the current location
        const currentUrl = new URL(window.location.href);
    
        // Access the URL's search parameters
        const searchParams = new URLSearchParams(currentUrl.search); 

        /**
         * Init
         */

        // Setup flatpickr date controls 
        this._fpEDD = flatpickr("#edd", {
            mode: "single",
            dateFormat: "Y-m-d"
        }) as flatpickr.Instance;
        this._fpLMP = flatpickr("#lmp", {
            mode: "single",
            dateFormat: "Y-m-d"
        }) as flatpickr.Instance;

        // Default page mode 
        this._mode = PageMode.Calc;

        // Hide timeline
        const timelineElement = document.getElementById("timeline");
        if (timelineElement) {
            timelineElement.style.display = "none";  
        } else {
            console.error("Element with ID 'timeline' not found.");
        }

        /**
         * Determine Page Mode
         */

        // If querystrying ?edd, mode is display
        // else mode is calc 
        const eddValue = searchParams.get(QUERY_PARAM_EDD);
        if (eddValue) {
            const parsedDate = new Date(eddValue);
            if (!isNaN(parsedDate.getTime())) {
                this._mode = PageMode.Display;
                this._edd = parsedDate;

                this._fpEDD.setDate(parsedDate, true);

            } else {
                console.error('Invalid date format:', eddValue);
            }
        }

        /**
         * Handlers
         */

        // Calc EDD button handler
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

                // Reload the page with the new query string
                window.location.href = `${window.location.pathname}?edd=${formattedDate}`;
            }

        });


        // Calc button handler
        const buttonCalc = document.getElementById('calc');
        buttonCalc?.addEventListener('click', () => { 
            const selectedDate = this._fpEDD.selectedDates[0];
            if (selectedDate) {
                const year = selectedDate.getFullYear();
                const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
                const day = selectedDate.getDate().toString().padStart(2, '0');
                const formattedDate = `${year}-${month}-${day}`;
                
                // Reload the page with the new query string
                window.location.href = `${window.location.pathname}?edd=${formattedDate}`;
            } else {
                console.error('No date selected.');
            } 
        });
        

        // We're done
        if(this._mode != PageMode.Display)
            return; 

        if(!this._edd) {
            console.error('No EDD set.');
            return; 
        }

// display-value progress
        /**
         * Progress
         */

        // Calculate the start date (LMP)
        const lmp = this._edd as Date; // new Date(this._edd);
        lmp.setDate(lmp.getDate() - 280); // 280 days before EDD

        // Calculate the difference between the LMP and today
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - lmp.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const weeks = Math.floor(diffDays / 7);
        const days = diffDays % 7;

        // Format the date in a readable format
        const readableDate = this._edd.toLocaleDateString('en-NZ', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        var data: any = {
            edd: readableDate,
            progress: `${weeks} weeks and ${days} days`
        }

// display-value edd

this.updateDisplayValues(data);

const maternityWeek = weeks + 1; 


        /**
         * Trimester
         * Mode Display
         *   - show display area
         *   - calc display area 
         */

this.updateVisibilityBasedOnWeek(maternityWeek); 


        /**
         * Hide/show areas
         * Mode Display
         *   - show display area
         *   - calc display area 
         */

        timelineElement!.style.display = "block";  
                    
    }

    updateVisibilityBasedOnWeek(maternityWeek: number) {
        const elements = document.querySelectorAll('[min-week], [max-week]');
    
        elements.forEach(element => {
            const minWeek = element.getAttribute('min-week');
            const maxWeek = element.getAttribute('max-week');
            const displayRule = element.getAttribute('display-rule') || 'current';
            let hide = false;
    
            switch (displayRule) {
                case 'current':
                    if ((minWeek && maternityWeek < parseInt(minWeek)) ||
                        (maxWeek && maternityWeek > parseInt(maxWeek))) {
                        hide = true;
                    }
                    break;
                case 'future':
                    if (minWeek && maternityWeek >= parseInt(minWeek)) {
                        hide = true;
                    }
                    break;
                case 'past':
                    if (maxWeek && maternityWeek <= parseInt(maxWeek)) {
                        hide = true;
                    }
                    break;
            }
    
            (element as HTMLElement).style.display = hide ? 'none' : '';
        });
    }

    updateDisplayValues(data: { [key: string]: any }) {
        const elements = document.querySelectorAll('[display-value]');
        elements.forEach(element => {
            const displayValue = element.getAttribute('display-value');
            if (displayValue && data[displayValue] !== undefined) {
                (element as HTMLElement).innerText = data[displayValue];
            }
        });
    }
    
}  

    
    
    
    