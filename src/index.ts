/*
 * SITE
 * Main entry point
 * 
 * https://engine.sygnal.com/
 * 
 * ENGINE MODE
 * ?engine.mode=dev
 * ?engine.mode=prod
 * 
 */

import { VERSION } from "./version";
import { routeDispatcher } from "./routes";

interface SiteDataType {
    // Define properties and their types for SiteDataType
    // For example:
    someProperty?: string;
    anotherProperty?: number;
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

        // Finsweet attributes
        fsAttributes: [string, (filterInstances: any[]) => void][];
        Site: SiteDataType
        //   modelsDataSourceElems: NodeListOf<HTMLElement>;
        //   modelsSelectElem: HTMLElement | null;
        //   modelsNavElem: HTMLElement | null; 

    }
}

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