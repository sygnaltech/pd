
/*
 * SITE 
 * Page | Services 
 * 
 */

import { WindowData, Window } from "../../types/global";
import { TimelyService } from "../services/booking/timely";
import { addEventListeners } from "../util";
import { IModule, Page } from "@sygnal/sse";


declare global {
    interface Window {
        data: WindowData;
    }
}

export class ServicesPage implements IModule {

    timely: TimelyService;

    constructor() {

        this.timely = new TimelyService("ponsonbydoctors"); 

    }

    setup() {
    }
    
    exec() {

        // Timely script already loaded at Site level

        if (!window.data) {
            console.error ("Window.data is not available.");
            return;
        }

        addEventListeners('*[timely="book"]', 'click', (e: Event) => {
            const target = e.currentTarget as HTMLElement;

            this.timely.bookService(
                target.getAttribute('categoryId'), 
                target.getAttribute('serviceId')
            ); 
        });

        addEventListeners('*[timely="ponsonby"]', 'click', (e: Event) => {
            const target = e.currentTarget as HTMLElement;

            this.timely.bookService(
                target.getAttribute('categoryId'), 
                target.getAttribute('serviceId')
            ); 
        });
        addEventListeners('*[timely="ponsonby-service"]', 'click', (e: Event) => {
            const target = e.currentTarget as HTMLElement;

            this.timely.bookService(
                target.getAttribute('categoryId'), 
                target.getAttribute('serviceId')
            ); 
        });
        addEventListeners('*[timely="online"]', 'click', (e: Event) => {
            const target = e.currentTarget as HTMLElement;

            this.timely.bookService(
                target.getAttribute('categoryId'), 
                target.getAttribute('serviceId')
            ); 
        });
        addEventListeners('*[timely="online-service"]', 'click', (e: Event) => {
            const target = e.currentTarget as HTMLElement;

            this.timely.bookService(
                target.getAttribute('categoryId'), 
                target.getAttribute('serviceId')
            ); 
        });                
  
        // Auto-booking based on URL parameter
        if (window.location.search.includes('action=book')) {

            this.timely.bookService(
                window.data.timely_categoryId, 
                window.data.timely_productId
            ); 

        }

    }

}  

    
    
    
    