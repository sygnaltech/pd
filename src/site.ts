
/*
 * Site
 */

import { IModule } from "./IModule";

// import gsap from 'gsap'; 
 

export class Site implements IModule {

  constructor() {
  }

  preInit() {
        
  }

  init() {

    console.log("Site."); 

    // const elements: NodeListOf<Element> = document.querySelectorAll(`.${item.className}`);
    // console.log("Making elements visible", elements);
    // gsap.to(elements, { display: 'block' });

  }

}
