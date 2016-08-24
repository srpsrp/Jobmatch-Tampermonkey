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
    
    var UJM_TIMEOUT_MINS = 27,UJM_MIN_NOTE_LENGTH=10, UJM_MAX_NOTE_LENGTH=240;
    var idleMins=0,now;
    var infoSpan=document.getElementById("MasterPage1_RightColumnContent_InsertJobSearchNote_MONSMessage1");
    var timeDateSpan=document.getElementById("MasterPage1_RightColumnContent_InsertJobSearchNote_MONSMessage4");

    var noteT=document.getElementById("MasterPage1_RightColumnContent_InsertJobSearchNote_NoteTextArea");
    noteT.style.height="350px";
    noteT.style.backgroundColor="rgb(240, 242, 123)";
    noteT.style.fontSize= "1.5em";
    noteT.addEventListener("keyup", checkNote );
    noteT.addEventListener("paste", 
                           function () { 
                                         //setTimeout(, 1000);
                                         setTimeout ( function () {
                                             checkNote();
                                             if (autoPost &&  
                                                (noteT.value.length <= UJM_MAX_NOTE_LENGTH) && 
                                                (noteT.value.length >= UJM_MIN_NOTE_LENGTH) &&
                                                (idleMins < UJM_TIMEOUT_MINS) ) {
                                                                                   console.log("auto posted " + noteT.value );
                                                                                   doUjLog();
                                                                                }
                                                },1000);
                           });
    // add global DOM  variables for gmail api cb function
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.innerText = "var checkAuth, handleAuthResult";
    document.getElementsByTagName('head')[0].appendChild(s);
    var today = new Date();
    var yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    var ddy = yesterday.getDate();
    var mmy = yesterday.getMonth()+1; //January is 0!
    var yyyyy = yesterday.getFullYear();
    
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) dd ='0'+ dd;
    if(mm<10) mm ='0'+ mm;
    if(ddy<10) ddy ='0'+ ddy;
    if(mmy<10) mmy ='0'+ mmy;
    //console.log(dd+"/"+mm+"/"+yyyy);
    var dayofweek=['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][today.getDay()];

    //Process Dates in table 
    var tds=document.getElementsByTagName("td"), tdc=0,td=0; //td tags counter, td element
    while (tdc<tds.length )
    { 
        td=tds[tdc++];
        if (td.innerText.search(ddy+"/"+mmy+"/"+yyyyy)==0) td.innerText="Yesterday";
        if (td.innerText.search(dd+"/"+mm+"/"+yyyy)==0) td.innerText="Today";
    } 
    updateIdleTimer(); setInterval(updateIdleTimer, 60000);


    var newone;
    function addWarning(){
       // infoSpan=document.getElementById("MasterPage1_RightColumnContent_InsertJobSearchNote_MONSMessage1");
        noteT.style.backgroundColor="#f2b5b5";
        if(idleMins>=UJM_TIMEOUT_MINS )
        {
            infoSpan.innerText="TIMED OUT! " +noteT.value.length +" chars";
        }else{
                    infoSpan.innerText= noteT.value.length +" chars";
        }

        
        infoSpan.classList.add("blink_me");
        
        //strangeness re. can't update innerText whilst animation in progrees..
        newone = infoSpan.cloneNode(true);
        infoSpan.parentNode.replaceChild(newone, infoSpan);
        infoSpan=newone;
    }
    function checkNote(){
       // var d = new Date();
        //var n = d.toString();
        if (noteT.value.length <= UJM_MAX_NOTE_LENGTH && idleMins < UJM_TIMEOUT_MINS ) {
                noteT.style.backgroundColor="rgb(240, 242, 123)";
                // note that we must get new refference here since was replaced
               // infoSpan=document.getElementById("MasterPage1_RightColumnContent_InsertJobSearchNote_MONSMessage1");
                infoSpan.classList.remove("blink_me");
                infoSpan.innerText= noteT.value.length +" chars";
                 } else addWarning();
    }

var zNode       = document.createElement ('div');
zNode.innerHTML = '<button id="myButton" type="button">'+
                'post</button>' +
                '<button id="randomLog" type="button">' +
                'Rnd</button>' +
                '<button id="truncate" type="button">' +
                'truncate</button>' +
                '<button id="autopost" type="button">' +
                'Auto Post ON</button>';
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
//document.head.appendChild (gmailApiHtml);
document.getElementById("authorize-button").addEventListener("click", handleAuthClick,false);
var APButton= document.getElementById("autopost");
    APButton.addEventListener("click", toggleAP,false);

    var autoPost = getCookie("autopost");
    autoPost=(autoPost === "") ? false : (autoPost == "on");
    toggleAP(true,true);
    // var autoPost=true;
function toggleAP (e, toggleInit){
    if (toggleInit===undefined ){
        autoPost = !autoPost;
        setCookie("autopost", autoPost ? "on":"off", 365);
    }
        APButton.innerText = autoPost ? " Auto Post ON" : "Auto Post OFF";
        APButton.style.backgroundColor=  autoPost ? " red" : "green";
}

//--- Activate the newly added button.
document.getElementById ("myButton").addEventListener (
    "click", ButtonClickAction, false);
    document.getElementById ("randomLog").addEventListener (
    "click", addRandomLog, false);
        document.getElementById ("truncate").addEventListener (
    "click", function () {noteT.value=noteT.value.substring(0,240);checkNote();}, false);

          var logs = [ 'Add all you activities to the logs array on line 135',
                  'Add all you activities to the logs array on line 135',
                  'Add all you activities to the logs array on line 135'
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
    document.getElementById("noteSelect").addEventListener("change", 
                    function(){ document.getElementsByName("MasterPage1:RightColumnContent:InsertJobSearchNote:NoteTextArea")[0].value=document.getElementById("noteSelect").value; });

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
// add generic entry to log or the one that was entered into textarea 
    if (document.getElementsByName("MasterPage1:RightColumnContent:InsertJobSearchNote:NoteTextArea")[0].value=="For example, enter details about following up on a job referral or calling about a job advertised in the newspaper.")
    {//add a default message
    var dailyLog=['logged onto UJM and searched jobs',
               'searched UJM and indeed',
               'performed search on UJM',
               'log onto UJM and indeed',
               'checked  Universal Job Match for new jobs',
               'went onto UJM online and checked jobs',
               'did search for new jobs on UJM',
               'logged onto job match to look for jobs',
               'went through new jobs on indeed and jobmatch', 'logged on to UJM to search jobs' ];
    
   document.getElementsByName("MasterPage1:RightColumnContent:InsertJobSearchNote:NoteTextArea")[0].value=dailyLog[Math.floor(Math.random()*dailyLog.length)];
    }
   //WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions("MasterPage1:RightColumnContent:InsertJobSearchNote:lnkbReference", "", true, "", "", false, true));
   doUjLog ();
}
    
    GM_addStyle ( multilineStr ( function () {/*!
    
    
#MasterPage1_HeaderContent_Header_Default_navBar_msgActivityHistory {
    color: rgb(73, 69, 255);
    font-size: 1.5em;
    font-weight: bold;
    padding: 3px 20px;
    line-height: 0.5em;
    background-color: rgba(209, 229, 255, 0.46);
    font-family: serif;
    border-radius: 11px;
    box-shadow: 5px 5px 23px #888f88;
}
    #autopost {
    background-color: red;
    color: white;
    border: 1px solid;
    width: 150px;
}
    #myContainer {
        position:               absolute;
top: 68.7px;
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
     * google email stuff below here
     */
    console.log("google code");
     // Your Client ID can be retrieved from your project in the Google
      // Developer Console, https://console.developers.google.com
    //  var CLIENT_ID = '636079679638-rho18up49rpksvpp91mptnaltut66j8g.apps.googleusercontent.com';
        var CLIENT_ID = '636079679638-74f1u4o40vj4ts7hbpjg817o9amdj4qb.apps.googleusercontent.com';



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
    
    //cookie code to remember autopost setting
    function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
        function updateIdleTimer()
    {
                    now = new Date();
                    idleMins=Math.round((now.getTime()-today.getTime())/60000);

                    timeDateSpan.innerText= idleMins + " mins. idle " +
                    today.toLocaleTimeString().replace(" BST", "") +
                    " " + dayofweek  +
                    " " + dd+"/"+mm+"/"+yyyy; 

                    if (idleMins >= UJM_TIMEOUT_MINS)addWarning();
    }


   
})();
 
