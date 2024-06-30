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

import { RouteDispatcher } from "@sygnal/sse";
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

    return routeDispatcher;
}

