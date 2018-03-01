// p410 - jsn2n - sitepoint - web worker - 26-Jan-18
"use strict"
var button = document.getElementById("rainbow");
var rainbow = ["red","orange","yellow","green","blue","indigo","violet"];
var passes = 0;

function change() {
 document.body.style.background = rainbow[Math.floor(7*Math.random())];
}

button.addEventListener("click", change);

var form = document.forms[0];
form.addEventListener("submit", factorize, false);

function factorize(event) {
	
	console.log(event) // this object is the input form
	
 event.preventDefault(); // prevent the form from being submitted
 var number = form.number.value; // extract number to factor
 
 if (window.localStorage){ // persist the input state
	 localStorage.pass = passes;
	 localStorage.fnumber = number;
	 localStorage.start = event.timeStamp // timestamp of the form event
	 if (!localStorage.prime) {localStorage.prime = []} // create prime[] array if not exist
 }
 	 document.getElementById("num").innerHTML = '<p>Seed: '+number+'</p>';
	 document.getElementById("output").innerHTML = "<p>Factoring...</p>"
 
 if(Worker){ // check that web workers are supported
	// instantiate the worker
   var werk = new Worker("https://s3.amazonaws.com/mikieseven.com/0factors.js");
    // send worker the number to factor
   werk.postMessage(number);
    // listen for the worker message to fire the callback
   werk.addEventListener('message', function(e) { // event object is NOW from worker callback
	 
	 // log worker event object to the console for visibility
	 console.log(e) 
	 
	 // Factors are returned in string event.data
	 let resAry = JSON.parse("[" + e.data + "]") 
	 // parse factors string into an array to get count
	 
	 if (resAry.length === 2) {  // 2 elements mean a PRIME factor
	 
		 // persist - the base number is PRIME
		 console.log('resAry - factors: '+resAry.length)
		 console.log(resAry)
		 
		 localStorage.prime = resAry[1]
		 // lS only stores data as strings
		 // explore conversion & store as JSON object - 4-Feb
		 console.log(localStorage.prime)
	 }
     
	 document.getElementById("fresult").innerHTML = 
		`<p>Result(s): ${resAry}</p>`;
	 document.getElementById("output").innerHTML = (resAry.length === 2) ? 
		`<p class="large red">PRIME ${resAry}</p>` :
		`<p class="small black">Factoring...COMPLETE ${((resAry.length)/2)} factor pairs</p>`;
	 
	if (window.localStorage){ // store start/stop in localStorage
	 localStorage.fresult = resAry;
	 localStorage.dur = e.timeStamp - localStorage.start;
	 document.getElementById("dur").innerHTML = 
	  `<p>Duration: ${(localStorage.dur)/1000} </p>`;
	}
   }, false);
   passes++;  
 }else{console.log('web worker not supported...'); alert('web worker not supported...')}
}
