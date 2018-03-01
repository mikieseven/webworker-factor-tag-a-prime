"# webworker-factor-tag-a-prime" 
Modified this HTML5 API exercise from sitepoint's "JavaScript Novice to Ninja"; the web worker file load must be accessed via http to meet the cross-site scripting requirements.  The text presents means of configuring the Chrome browser to allow local access, however, loading from online storage that supports http is a solution.
26-Jan-18
These files are placed in a static AWS S3 bucket and serve from a URI domain. 
The code runs and in debug mode, the web worker is downloaded and executed.  
In the worker, the event.data is calculated, returned and assigned to the 'output' ID in the <div> element in the HTML file; 
