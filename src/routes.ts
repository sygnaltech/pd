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

// import { MaternityScanCalcPage } from "./page/maternityScanCalc"; 
// import { HomePage } from "./page/home";
import { RouteDispatcher } from "@sygnal/sse";
//import { TestWfuIfPage } from "./page/test-wfu-if";
import { Site } from "./site";
import { ServicesPage } from "./page/services";
import { ClinicPage } from "./page/clinic";

export const routeDispatcher = (): RouteDispatcher => {
    
    var routeDispatcher = new RouteDispatcher(Site);
    routeDispatcher.routes = {

        // Site paes
        '/services/*': ServicesPage,
        '/clinics/*': ClinicPage, 

    };
//    routeDispatcher.execRoute(); 

    return routeDispatcher;
}

