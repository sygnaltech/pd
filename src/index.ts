/*
 * SITE
 * Main entry point
 * 
 */

import { ClinicPage } from "./page/clinic";
import { RouteDispatcher } from "./routeDispatcher";

// Global Rise object
window['Site'] = window['Site'] || {}; 
var Rise = window['Site'];

const init = () => {

    console.log("SITE package init v0.0.1");

    
    var routeDispatcher = new RouteDispatcher();
    routeDispatcher.routes = {
        '/': () => {

            // No special code

        },
        '/clinics/*': () => {

            (new ClinicPage()).init();

        },

    };

    console.log('loaded')
}

document.addEventListener("DOMContentLoaded", init)