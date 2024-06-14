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

import { MaternityScanCalcPage } from "./page/maternityScanCalc"; 
import { HomePage } from "./page/home";
import { RouteDispatcher } from "./routeDispatcher";
import { VERSION } from "./version";

export const routeDispatcher = (): RouteDispatcher => {
    
    var routeDispatcher = new RouteDispatcher();
    routeDispatcher.routes = {
        '/': HomePage,
        '/maternity': MaternityScanCalcPage,
    };
//    routeDispatcher.execRoute(); 

    return routeDispatcher;
}

