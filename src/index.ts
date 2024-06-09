/*
 * SITE
 * Main entry point
 * 
 */

import { ClinicPage } from "./page/clinic";
import { ServicesPage } from "./page/services";
import { RouteDispatcher } from "./routeDispatcher";
import { TimelyService } from "./services/booking/timely";
import { Site } from "./site";
import { VERSION } from "./version";

// Global vars
const SITE_NAME = 'Site';
//const VERSION = 'v0.1.8';

// Global Site object
// window['Site'] = window['Site'] || {}; 
// var Site = window['Site'];


// declare global {
//     interface Window {
//         data: WindowData;
//     }
// }


const init = async() => {
    
    console.log(`%c${SITE_NAME} package init ${VERSION}`, "color: blue;");
    // console.log("%c📶 Signal Site Engine: Initialization complete", "color: blue; background: url('https://assets.sygnal.com/https://cdn.prod.website-files.com/59b8d49f7fdf9700017d780f/59b8d57a646143000180fcca_sygnal-logo-small.png') no-repeat left center; padding-left: 20px;");
    // console.log("%c📶 Signal Site Engine: Initialization complete", "color: blue; background: url('https://assets.sygnal.com/https://cdn.prod.website-files.com/59b8d49f7fdf9700017d780f/59b8d57a646143000180fcca_sygnal-logo-small.png') no-repeat left center; padding-left: 20px;");

    (new Site()).init(); 
    
    await (new TimelyService()).init();

    var routeDispatcher = new RouteDispatcher();
    routeDispatcher.routes = {
        '/': () => {

            // No special code

        },
        '/services/*': () => {

            (new ServicesPage()).init();

        },
        '/clinics/*': () => {

            (new ClinicPage()).init();

        },

    };
    routeDispatcher.dispatchRoute(); 

}

document.addEventListener("DOMContentLoaded", init)