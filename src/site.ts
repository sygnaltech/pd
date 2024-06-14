
/*
 * Site
 */

import { IRouteHandler } from "./IRouteHandler";

// import gsap from 'gsap'; 
 

export class Site implements IRouteHandler {

  constructor() {
  }

  setup() {
        
  }

  exec() {

    console.log("Site."); 

    // const elements: NodeListOf<Element> = document.querySelectorAll(`.${item.className}`);
    // console.log("Making elements visible", elements);
    // gsap.to(elements, { display: 'block' });

  }

}
