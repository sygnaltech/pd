
/*
 * Site
 */

import { IRouteHandler, Page } from "@sygnal/sse";
import posthog from 'posthog-js'
// import { loadEngineCSS } from "./engine/core";

// import gsap from 'gsap'; 
 

export class Site implements IRouteHandler {

  constructor() {
  }

  setup() {

    Page.loadEngineCSS("site.css"); 
   
    posthog.init('phc_XNXwsF5o7snDKAZVngbWLupKigbqv16MBNOC8UoWKE', { api_host: 'https://us.i.posthog.com', person_profiles: 'identified_only' })

  }

  exec() {

  }

}

