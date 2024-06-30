/*
 * SITE
 * Main entry point
 * 
 */

import { ClinicPage } from "./page/clinic";
import { ServicesPage } from "./page/services";
// import { RouteDispatcher } from "./routeDispatcher";
import { TimelyService } from "./services/booking/timely";
import { Site } from "./site";
import { VERSION } from "./version";
import { routeDispatcher } from "./routes";
import { initSSE } from "@sygnal/sse"; 

// Global vars
//const VERSION = 'v0.1.8';

// Global Site object
// window['Site'] = window['Site'] || {}; 
// var Site = window['Site'];


// declare global {
//     interface Window {
//         data: WindowData;
//     }
// }


interface SiteGlobalDataType {
    // Define properties and their types for SiteDataType
    // For example:
    // someProperty?: string;
    // anotherProperty?: number;
    // Add other properties as needed
}


// Global vars
const SITE_NAME: string = 'Site';

// Global object
// window[SITE_NAME] = window[SITE_NAME] || {}; 
// var SiteData = window[SITE_NAME];

// Extend the Window interface to include globals
// as a Typescript accessibility convenience
declare global {
    interface Window {

        // fsAttributes
        fsAttributes: [string, (filterInstances: any[]) => void][];

        // Site global data
        Site: SiteGlobalDataType;

    }
}

// https://codepen.io/memetican/pen/eYrrvxW/e3b373367dec74d2d3f33418c88ac7b3
// https://codepen.io/memetican/pen/mdvvQjr/d8977b7cbf76dd4344b36b2136205086 

// Init SSE Engine
initSSE(); 

// Perform setup, sync
const setup = () => {
    
    console.log(`${SITE_NAME} package init v${VERSION}`);
    
    routeDispatcher().setupRoute(); 

}

// Perform exec, async
// After DOM content loaded 
const exec = () => {
    
    routeDispatcher().execRoute(); 

}


// const init = async() => {
    
//     console.log(`%c${SITE_NAME} package init ${VERSION}`, "color: blue;");
//     // console.log("%c📶 Signal Site Engine: Initialization complete", "color: blue; background: url('https://assets.sygnal.com/https://cdn.prod.website-files.com/59b8d49f7fdf9700017d780f/59b8d57a646143000180fcca_sygnal-logo-small.png') no-repeat left center; padding-left: 20px;");
//     // console.log("%c📶 Signal Site Engine: Initialization complete", "color: blue; background: url('https://assets.sygnal.com/https://cdn.prod.website-files.com/59b8d49f7fdf9700017d780f/59b8d57a646143000180fcca_sygnal-logo-small.png') no-repeat left center; padding-left: 20px;");

//     (new Site()).init(); 
    
//     await TimelyService.loadTimelyScript();

//     var routeDispatcher = new RouteDispatcher();
//     routeDispatcher.routes = {
//         '/': () => {

//             // No special code

//         },
//         '/services/*': () => {

//             (new ServicesPage()).init();

//         },
//         '/clinics/*': () => {

//             (new ClinicPage()).init();

//         },

//     };
//     routeDispatcher.dispatchRoute(); 

// }

 // document.addEventListener("DOMContentLoaded", init)




/**
 * Initialize
 */

// Perform setup, sync
setup();

// Perform exec, async
if (document.readyState !== 'loading') {
    exec();
} else {
    document.addEventListener("DOMContentLoaded", exec);
}