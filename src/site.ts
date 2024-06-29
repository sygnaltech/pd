
/*
 * Site
 */

import { IRouteHandler, Page } from "@sygnal/sse";
// import { loadEngineCSS } from "./engine/core";

// import gsap from 'gsap'; 
 

export class Site implements IRouteHandler {

  constructor() {
  }

  setup() {

    Page.loadEngineCSS("site.css"); 
   
  }

  exec() {

  }

}

