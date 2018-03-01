"# webworker-factor-tag-a-prime" 
Modified this HTML5 API exercise from sitepoint's "JavaScript Novice to Ninja"; the web worker file load must be accessed via http to meet the cross-site scripting requirements.  The text presents means of configuring the Chrome browser to allow local access, however, loading from online storage that supports http is a solution.
26-Jan-18
These files are placed in a static AWS S3 bucket and serve from a URI domain. 
The code runs and in debug mode, the web worker is downloaded and executed.  
In the worker, event.data is calculated, returned and rendered to the 'output' ID element of the HTML file;

NOTE:  in addition to HTML5 API web worker this code also uses the localStorage API.  In Chrome, cross-site-scripting has protocol requirements that affect code execution (yeah duh) however, some extensions and privacy settings will affect access to localStorage; I found that disabling 3rd party cookies will cause the localStorage Access Denied error.

A resource from Chromium:  
https://www.chromium.org/for-testers/bug-reporting-guidelines/uncaught-securityerror-failed-to-read-the-localstorage-property-from-window-access-is-denied-for-this-document
