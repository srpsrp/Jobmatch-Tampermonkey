// ==UserScript==
// @name         ujm buttons to add a  log
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://jobsearch.direct.gov.uk/Account/ActivityHistory.aspx*
// @grant       GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    
    var UJM_TIMEOUT_MINS = 25;
    
        //var noteT=document.getElementsByName("MasterPage1:RightColumnContent:InsertJobSearchNote:NoteTextArea")[0];
        var noteT=document.getElementById("MasterPage1_RightColumnContent_InsertJobSearchNote_NoteTextArea");
    noteT.style.height="350px";
    noteT.style.backgroundColor="rgb(240, 242, 123)";
    noteT.style.fontSize= "1.5em";
    noteT.addEventListener("keyup", checkNote );
    noteT.addEventListener("paste", function () { setTimeout(checkNote, 1000);} );
var infoSpan;
    
    
    // global  variables for gmail api cb function
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.innerText = "var checkAuth, handleAuthResult";
    document.getElementsByTagName('head')[0].appendChild(s);
    
    var tdc=0,td=0;
    var today = new Date();
    var ddy = today.getDate()-1;
    var dd = today.getDate();

    

    var mm = today.getMonth()+1; //January is 0!



    var yyyy = today.getFullYear();
    if(dd<10){
    dd='0'+dd;
} 
if(mm<10){
    mm='0'+mm;
}
            console.log(dd+"/"+mm+"/"+yyyy);
    var dayofweek=['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][today.getDay()];
    var timeDateSpan=document.getElementById("MasterPage1_RightColumnContent_InsertJobSearchNote_MONSMessage4");
    var idleMins=0;


    function updateIdleTimer()
                {
                 timeDateSpan.innerText= idleMins++ + " mins. idle "+
                    today.toLocaleTimeString().replace(" BST", "")+
                    " " +dayofweek  +
                    " " + dd+"/"+mm+"/"+yyyy; 
                }
    updateIdleTimer();
    setInterval(updateIdleTimer, 60000);    
    var tds=document.getElementsByTagName("td");
    console.log(tds.length+" tds.length" +" tdc is" +tdc );
    console.log(tdc<=tds.length);
    while (tdc<tds.length )
    { 
             console.log("text "+td.innerText + tdc);
       td=tds[tdc]    ;tdc+=1;
        if (td.innerText.search(ddy+"/"+mm+"/"+yyyy)==0) td.innerText="Yesterday";
        if (td.innerText.search(dd+"/"+mm+"/"+yyyy)==0) td.innerText="Today";
    } 
                                                                             
                                                                             

    
function checkNote(){  
        var d = new Date();
    var n = d.toString();
             infoSpan=document.getElementById("MasterPage1_RightColumnContent_InsertJobSearchNote_MONSMessage1");


                       if (noteT.value.length <= 240 && idleMins < UJM_TIMEOUT_MINS ) 
                       { noteT.style.backgroundColor="rgb(240, 242, 123)";
                       
                           infoSpan.classList.remove("blink_me");
                            infoSpan.innerText= noteT.value.length +" chars";
                       } else
                       {
                           noteT.style.backgroundColor="#f2b5b5"; 
                           //infoSpan.classList.remove("blink_me");
                                                      infoSpan.innerText= noteT.value.length +" chars";
                           if(idleMins>UJM_TIMEOUT_MINS) infoSpan.innerText="TIMED OUT! " +infoSpan.innerText;

                           infoSpan.classList.add("blink_me");


                           var newone = infoSpan.cloneNode(true);
                           infoSpan.parentNode.replaceChild(newone, infoSpan);


                       }
                    }

var zNode       = document.createElement ('div');
zNode.innerHTML = '<button id="myButton" type="button">'
                + 'post</button>'
                + '<button id="randomLog" type="button">'
                + 'Rnd</button>'
                 + '<button id="truncate" type="button">'
                + 'truncate</button>'
                ;
zNode.setAttribute ('id', 'myContainer');
document.body.appendChild (zNode);

     var gmailApiHtml = document.createElement ('div');
    gmailApiHtml.innerHTML=
        ' <div id="authorize-div" Xstyle="display: none">'+
        ' <span>Authorize access to Gmail API</span> <!--Button for the user to click to initiate auth sequence -->'+
      '<button id="authorize-button" NONonclick="handleAuthClick(event)">Authorize</button></div>'+
    '<pre id="output"></pre>';
document.body.appendChild (gmailApiHtml);
             gmailApiHtml = document.createElement ('script');
        gmailApiHtml.type = 'text/javascript';
    //gmailApiHtml.async = true;
gmailApiHtml.setAttribute ('src', 'https://apis.google.com/js/client.js?onload=checkAuth');
document.head.appendChild (gmailApiHtml);
document.getElementById("authorize-button").addEventListener("click", handleAuthClick,false);

//--- Activate the newly added button.
document.getElementById ("myButton").addEventListener (
    "click", ButtonClickAction, false);
    document.getElementById ("randomLog").addEventListener (
    "click", addRandomLog, false);
        document.getElementById ("truncate").addEventListener (
    "click", function () {noteT.value=noteT.value.substring(0,240);checkNote();}, false);

    var logs = ['add all your options into the logs array on line #140' ,
                'add all your options into the logs array on line #140',
                'add all your options into the logs array on line #140'    
            
              ];
    

    var t0 = performance.now();
        for(var i = 0; i < logs.length; i = i + 1) {
       logs[i]= logs[i].charAt(0).toUpperCase() + logs[i].slice(1); }
    logs=logs.sort();

var t1 = performance.now();
console.log("Call to sort took " + (t1 - t0) + " milliseconds.");




        addInput(zNode);
//console.log(logs.sort());

    function addInput(divName) {
    var newDiv = document.createElement('div');
    var selectHTML = "";
    selectHTML='<select id="noteSelect" >';
    for( i = 0; i < logs.length; i = i + 1) {
       //logs[i]= logs[i].charAt(0).toUpperCase() + logs[i].slice(1);
        selectHTML += "<option value='" + logs[i] + "'>" + logs[i] + "</option>";
    }
    selectHTML += "</select>";
    newDiv.innerHTML = selectHTML;
    //document.getElementById(divName).appendChild(newDiv);
            divName.appendChild(newDiv);
document.getElementById("noteSelect").addEventListener("change", function(){ document.getElementsByName("MasterPage1:RightColumnContent:InsertJobSearchNote:NoteTextArea")[0].value=document.getElementById("noteSelect").value; });

}
    
    
    function addRandomLog () {


//alert(logs[3]);
    //alert (logs[Math.floor(Math.random()*logs.length)]);
    document.getElementsByName("MasterPage1:RightColumnContent:InsertJobSearchNote:NoteTextArea")[0].value=logs[Math.floor(Math.random()*logs.length)];
    //doUjLog ();

}
function doUjLog () {
    WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions("MasterPage1:RightColumnContent:InsertJobSearchNote:lnkbReference", "", true, "", "", false, true));

}
function ButtonClickAction (zEvent) {
    /*--- For our dummy action, we'll just add a line of text to the top
        of the screen.
    */
   /* var zNode       = document.createElement ('p');
    zNode.innerHTML = 'The button was clicked.';
    document.getElementById ("myContainer").appendChild (zNode);*/
    if (document.getElementsByName("MasterPage1:RightColumnContent:InsertJobSearchNote:NoteTextArea")[0].value=="For example, enter details about following up on a job referral or calling about a job advertised in the newspaper.")
    {//add a default message
    var dailyLog=['logged onto UJM and searched jobs',
               'searched UJM and indeed',
               'performed search on UJM',
               'log onto UJM and indeed',
               'checked  Universal Job Match for new jobs',
               'went onto UJM online and checked jobs',
               'went through new jobs on indeed and jobmatch', 'logged on to UJM to search jobs' ];
    
   document.getElementsByName("MasterPage1:RightColumnContent:InsertJobSearchNote:NoteTextArea")[0].value=dailyLog[Math.floor(Math.random()*dailyLog.length)];
    }
   //WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions("MasterPage1:RightColumnContent:InsertJobSearchNote:lnkbReference", "", true, "", "", false, true));
   doUjLog ();
}
    
    GM_addStyle ( multilineStr ( function () {/*!
    #myContainer {
        position:               absolute;
top: 35.7px;
left: 200px;
        font-size:              20px;
        background:             #D63F0D;
        border:                 1px outset #6699cc;
        margin:                 5px;
        box-shadow: 10px 10px 23px #888f88;
        z-index:                222;
        padding:                5px 20px;
        border-radius: 10px;
    }
    #myButton {
        cursor:                 pointer;
    }
    #myContainer p {
        color:                  red;
        background:             white;
        }
        .blink_me {
  animation: blinker 1s linear infinite;
  color:red;
  font-size:2em;
}
div.note {
    Xdisplay: none;
}

@keyframes blinker {  
  50% { opacity: 0.0; }
}
    #MasterPage1_RightColumnContent_InsertJobSearchNote_NoteTextArea{
      border-radius: 10px;
      padding: 10px;outline: none;
    }
    .activityHistory{
      background-color : rgba(11, 213, 255, 0.07); color: rgb(41, 9, 174);font-family: serif;

font-size: 1.3em
    }
    .wrapper {background-color:rgba(195, 215, 242, 0.92);}
    .activityTable td { padding : 6px 7px;border-top: 1px dashed #2e5bba;}
    .activityTable{border: none;
border-radius: 9px;
padding: 5px; }
   .header .mainNav1{margin-bottom: 0;}
   div.mastHead.clearfix{display:none;}
   thead{display:none;}
   #mainPws{display:none;}
   div.clearfix.footer{display:none;}
   div.content_section.jobsearch-notes{
   margin-top:117px;background-color:rgba(195, 215, 242, 0.92);
   }
       #MasterPage1_RightColumnContent_InsertJobSearchNote_MONSMessage4 {color: rgb(94, 90, 255);font-size: 0.7em;}
       div.boxHeader.cssTextAlignCenter {background-color: rgb(195, 212, 255);}


*/} ) );

function multilineStr (dummyFunc) {
    var str = dummyFunc.toString ();
    str     = str.replace (/^[^\/]+\/\*!?/, '') // Strip function () { /*!
            .replace (/\s*\*\/\s*\}\s*$/, '')   // Strip */ }
            .replace (/\/\/.+$/gm, '') // Double-slash comments wreck CSS. Strip them.
            ;
    //console.log(str);
    return str;
}
         function  update () {
          document.getElementsByName("MasterPage1:RightColumnContent:InsertJobSearchNote:NoteTextArea")[0].value=document.getElementById("noteSelect").value;
      } 
    
    
    
    /*
     * google email stuff below here (beta) 
     */
    console.log("google code");
     // Your Client ID can be retrieved from your project in the Google
      // Developer Console, https://console.developers.google.com
        var CLIENT_ID = 'enter client ID';



      var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

    
    
          /**
       * Handle response from authorization server.
       *
       * @param {Object} authResult Authorization result.
       */
       handleAuthResult= function (authResult) {
        var authorizeDiv = document.getElementById('authorize-div');
        if (authResult && !authResult.error) {
            console.log('authed');
          // Hide auth UI, then load client library.
          authorizeDiv.style.display = 'none';
          loadGmailApi();
        } else {
          // Show auth UI, allowing the user to initiate authorization by
          // clicking authorize button.
          authorizeDiv.style.display = 'inline';
        }
      };
    
      /**
       * Check if current user has authorized this application.
       */
     checkAuth= function () {
          //alert('checkAuth');
        gapi.auth.authorize(
          {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
          }, handleAuthResult);
      };



      /**
       * Initiate auth flow in response to user clicking authorize button.
       *
       * @param {Event} event Button click event.
       */
      function handleAuthClick(event) {
        gapi.auth.authorize(
          {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
          handleAuthResult);
        return false;
      }

      /**
       * Load Gmail API client library. List labels once client library
       * is loaded.
       */
      function loadGmailApi() {
        gapi.client.load('gmail', 'v1', listLabels);
      }

      /**
       * Print all Labels in the authorized user's inbox. If no labels
       * are found an appropriate message is printed.
       */
      function listLabels() {
        var request = gapi.client.gmail.users.labels.list({
          'userId': 'me'
        });

        request.execute(function(resp) {
          var labels = resp.labels;
          appendPre('Labels:');

          if (labels && labels.length > 0) {
            for (i = 0; i < labels.length; i++) {
              var label = labels[i];
              appendPre(label.name);
            }
          } else {
            appendPre('No Labels found.');
          }
        });
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        var pre = document.getElementById('output');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }
   
})();
 
