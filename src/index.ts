/*
 * SITE
 * Main entry point
 * 
 */

import { VERSION } from "./version";
import { routeDispatcher } from "./routes";
import { initSSE } from "@sygnal/sse"; 



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