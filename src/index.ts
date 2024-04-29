/*
 * SITE
 * Main entry point
 * 
 */

import { MaternityScanCalcPage } from "./page/maternityScanCalc"; 
import { RouteDispatcher } from "./routeDispatcher";

// Global Site object
window['Site'] = window['Site'] || {}; 
var Site = window['Site'];

const init = () => {

    console.log("SITE package init v0.0.1");

    
    var routeDispatcher = new RouteDispatcher();
    routeDispatcher.routes = {
        '/': () => {

            // No special code

        },
        '/maternity': () => {

            (new MaternityScanCalcPage()).init();

        },

    };
    routeDispatcher.dispatchRoute(); 

    console.log('loaded')
}

document.addEventListener("DOMContentLoaded", init)