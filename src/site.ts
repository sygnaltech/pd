
/*
 * SITE 
 * Site-wide Code 
 * 
 */

import { IRouteHandler, Page } from "@sygnal/sse";


export class Site implements IRouteHandler {

    constructor() {
    }
    
    setup() {

        console.log("load scripts"); 
        Page.loadEngineCSS("site.css"); 

    }
    
    exec() {
        
        Page.loadScript("//book.gettimely.com/widget/book-button-v1.5.js"); 

        
        this.addActionToBookLinks();
                    
    }

    // Function to add ?action=book to elements with the [pd-book] attribute
    addActionToBookLinks(): void {
        // Select all elements with the [pd-book] attribute
        const bookElements = document.querySelectorAll('[pd-book]') as NodeListOf<HTMLAnchorElement>;
    
        // Iterate over the selected elements
        bookElements.forEach(element => {
        const currentHref = element.getAttribute('href');
        if (currentHref) {
            // Update the href attribute with the new query parameter
            element.setAttribute('href', `${currentHref}?action=book`);
        }
        });
    }
  
}  

    
/*
old code

// Define the lookup table for locales and their corresponding path prefixes
const localePaths = {
    "en": "", // Assuming "en" is the primary locale and has no prefix
    "zh": "/zh", // Example for Chinese
    // Add more locales and their prefixes as needed
};  
  
// Function to determine the current page's locale
function getCurrentLocale() {
    return document.documentElement.lang || "en"; // Default to "en" if no lang attribute is found
}  
  
// Function to update the href attributes for links with the custom attribute "wfu-local-url"
function updateLinksForLocale() {
    const currentLocale = getCurrentLocale();
  
  console.log(currentLocale)
  
    const pathPrefix = localePaths[currentLocale] || ""; // Default to empty string if the locale is not found in the lookup table
    
   console.log(pathPrefix)
  
    // Find all links with the custom attribute "wfu-local-url"
    const links = document.querySelectorAll('a[wfu-locale-url]');
    
    links.forEach(link => {
        // Prepend the pathPrefix to the href attribute, if it's not already there
        if (!link.href.startsWith(pathPrefix)) {
            // Ensure to handle absolute URLs correctly
            // Extract the base URL if the href is absolute, and then prepend the pathPrefix
            const baseUrl = link.href.replace(window.location.origin, "");
            link.href = `${window.location.origin}${pathPrefix}${baseUrl}`;
        }
    });
}  
  
// Call updateLinksForLocale to update links as soon as the script runs
updateLinksForLocale();  
  
  
//   $("[wfu-query]").each(function() {
//     console.log($(this).attr("href"));
//     const url = new URL($(this).attr("href"),
//                        window.location.origin
//                        );
    
//     const params = url.searchParams;
//     const newParams = new URLSearchParams($(this).attr("wfu-query"));
    
//     console.log(params.toString());
//     console.log(newParams.toString());
    
//   });
  
  
});

// Google Tag Manager Tracking
$("[wfu-gtm-event]").click(function() {
  console.debug('Button clicked - GTM tracking');
  var data = {
    'event': $(this).attr('wfu-gtm-event')
  };

  // Find GTM Event attributes
  // and add to dataLayer
  const dataLayerAttrPrefix = "wfu-gtm-event-";
  $.each(this.attributes, function() {
       console.debug(`attr ${this.name}`); 
    
     if(this.name.startsWith(dataLayerAttrPrefix)) {
       var dataLayerVar = this.name.substring(dataLayerAttrPrefix.length);
       console.debug(`wfu-attr ${dataLayerVar} ${this.value}`); 
       data[dataLayerVar] = this.value;
      }
   });
  
  dataLayer.push(data);
  console.log(JSON.stringify(data,null,3));
  
});
*/    