
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
import { formatISODate } from "../util";
import { Instance } from "flatpickr/dist/types/instance";
import { IRouteHandler } from "../engine/routeDispatcher";
import { loadCSS, loadStyle } from "../engine/core";
import { SA5Logic } from "../sa5/logic";
import { MaternityCalc } from "../maternityCalc";


enum PageMode {
    Calc,
    Display
}

const QUERY_PARAM_EDD = "edd";
const ID_CALC_TIMELINE = "calc";
const ID_CALC_EDD = "calc-edd"; 

export class MaternityScanCalcPage implements IRouteHandler {

    _mode: PageMode = PageMode.Calc;
    _edd: Date | null = null;

    // _fpEDD: Instance | Instance[]; // = flatpickr("#edd", {});
    // _fpLMP: Instance | Instance[];// = flatpickr("#lmp", {});
    _fpEDD!: flatpickr.Instance; 
    _fpLMP!: flatpickr.Instance; 
    // _fpEDD: flatpickr.Instance | null = null; 
    // _fpLMP: flatpickr.Instance | null = null; 

    constructor() { 
    }
    
    setup() {

        loadStyle(`
            .simplybook-widget-button {
                display: none !important;
            }
            `);

        loadCSS("https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css"); 

    }

    exec() {

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

        if (!this._fpEDD || !this._fpLMP) {
            console.error("Cannot initialize Flatpickr controls");
            return;
        }

        // Default page mode 
        this._mode = PageMode.Calc;

        // Hide timeline
        const timelineElement = document.getElementById("timeline");
        if (timelineElement) {
            timelineElement.style.display = "none";  
        } else {
            console.error("Element with ID 'timeline' not found.");
        }

        // Apply Conditional Visibility 

        (new SA5Logic()).init(); 

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

                const maternityCalc: MaternityCalc = MaternityCalc.createFromLMP(new Date(lmpInput.value)); 
                const edd = maternityCalc._edd; 

                console.log("calc button clicked", edd)
                const eddDate: Date = new Date(edd); 
                const formattedDate = formatISODate(eddDate);

                // Reload the page with the new query string
                window.location.href = `${window.location.pathname}?edd=${formattedDate}`;
            }

        });


        // Update EDD button handler
        const buttonCalc = document.getElementById('calc');
        buttonCalc?.addEventListener('click', () => { 
            const selectedDate = this._fpEDD.selectedDates[0];
            if (selectedDate) {

                // const year = selectedDate.getFullYear();
                // const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
                // const day = selectedDate.getDate().toString().padStart(2, '0');
                // const formattedDate = `${year}-${month}-${day}`;

                const formattedDate = formatISODate(selectedDate);
                
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

        const maternityCalc: MaternityCalc = new MaternityCalc(this._edd); 

        /**
         * Progress
         */

        const weeks = Math.floor(maternityCalc.dayOf / 7);
        const days = maternityCalc.dayOf % 7;

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

        const maternityWeek = maternityCalc.weekOf; 

        /**
         * Calc service week-dates
         */

        this.calculateAndDisplayTimelineWeekDates(
            maternityCalc
        ); 


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
    private formatDateWithDifference(date: Date): string {
        const today = new Date();
        const diffTime = date.getTime() - today.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    
        let diffText: string;
    
        if (diffDays === 0) {
          diffText = "(today)";
        } else if (diffDays === 1) {
          diffText = "(tomorrow)";
        } else if (diffDays === -1) {
          diffText = "(yesterday)";
        } else if (diffDays > 1) {
          diffText = `(in ${diffDays} days)`;
        } else {
          diffText = `(${Math.abs(diffDays)} days ago)`;
        }
    
        return `${date.toDateString()} ${diffText}`;
    }

    calculateAndDisplayTimelineWeekDates(calc: MaternityCalc) {

        // Calc and display week start dates 
        const startDateElements = document.querySelectorAll<HTMLElement>('[week-startdate]');

        startDateElements.forEach(element => {
          const weekStr = element.getAttribute('week-startdate');
          if (weekStr) {
            const week = parseInt(weekStr);
            if (!isNaN(week)) {
              const calculatedDate = calc.getWeekStartDate(week);
              element.innerText = this.formatDateWithDifference(calculatedDate);
            }

            // const week = parseInt(weekStr) - 1;
            // if (!isNaN(week)) {
            //   const calculatedDate = new Date(calc.lmpDate);
            //   calculatedDate.setDate(calculatedDate.getDate() + (week * 7));
            //   (element as HTMLElement).innerText = this.formatDateWithDifference(calculatedDate);
            // }

          }
        });

        // Calc and display week end dates 
        const endDateElements = document.querySelectorAll<HTMLElement>('[week-enddate]');

        endDateElements.forEach(element => {
          const weekStr = element.getAttribute('week-enddate');
          if (weekStr) {
            const week = parseInt(weekStr); // - 1;
            if (!isNaN(week)) {

                const calculatedDate = calc.getWeekEndDate(week);
                element.innerText = this.formatDateWithDifference(calculatedDate);
  
            //   const calculatedDate = new Date(calc.lmpDate);
            //   calculatedDate.setDate(calculatedDate.getDate() + (week * 7) + 6); // Add 6 days for end of week
            //   element.innerText = this.formatDateWithDifference(calculatedDate);
            }
          }
        });

      }

    updateVisibilityBasedOnWeek(maternityWeek: number) {
        const elements = document.querySelectorAll<HTMLElement>('[min-week], [max-week]');
    
//        let displayCards = 0; 
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
    
            // if(!hide)
            //     displayCards += 1;
//            element.parentElement?.removeChild(element); //.remove();
            element.style.display = hide ? 'none' : '';
            if(hide)
                element.remove(); 
        });

        // Remove empty card groups
        const cardGroups = document.querySelectorAll<HTMLElement>('[card-group]');
        cardGroups.forEach(cardGroup => {
            const cards = cardGroup.querySelectorAll('[card]');
            if (cards.length === 0) {
                cardGroup.remove();
            }
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

    
    
    
    