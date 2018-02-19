// ==UserScript==
// @name         filter table of results ( just hided them)
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://jobsearch.direct.gov.uk/JobSearch/PowerSearch.aspx*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    
    
    //document.querySelector(".layoutFluidR2C").appendChild(document.querySelector("table.JSresults").cloneNode(false));
    
    var newTable=document.querySelector("table.JSresults").cloneNode(true);
    //newTable.classList.remove("JSresults");
    document.querySelector("div.layoutFluidR2C").appendChild(newTable);

    
    //removes spam from search
    //var tableNodeList=document.querySelectorAll("table.JSresults tr")[1].textContent.search('Orridge');
    
    
    var removeList= [ "orridge","nhs jobs" ,"care assistant", "carer", "care","Teaching Personnel", "freshwater",
                      "cowes", "apprentice",  "nurse", "wight", "cleaner" ,"cleaning" ,"bristol", "forklift",
                     "albanian", "german","french" , "polish", "interpreter"
                    ];
    
    var x=0,i,n, tableNodeList=document.querySelectorAll("table.JSresults:nth-of-type(1) tr"), 
        rmdTableNodeList=newTable.querySelectorAll(" tr");
    //console.log("searching " +n + " lines " +tableNoedList.length);
    for (i = 0; i < tableNodeList.length; i++) {
      for(n=0;n<removeList.length; n++)
      {  
        if (tableNodeList[i].textContent.toLowerCase().includes(removeList[n])===true) 
        {
            tableNodeList[i].style.display = "none"; 
            rmdTableNodeList[i].style.background = "gray";
            x++;
        }
      }    
   }
    

    console.log(x +" rows removed");
    document.getElementById("MasterPage1_SubTitle_lblSubTitle").innerText=x +" rows removed";
   // console.log(tableNodeList);
})();