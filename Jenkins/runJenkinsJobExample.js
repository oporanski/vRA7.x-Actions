//Params:
// - host: REST:RESTHost - vRest host endpoint 
// - jobName:string - Jenkins Project Name
//Return:String
// Run a Jenkins Job

//RUN JOB
var requestUrl = "/job/" + jobName + "/build";
System.debug("Request full URL: " + requestUrl);
var request = RESTHost.createRequest("POST", requestUrl, null);
request.contentType = "application/xml";
response = request.execute();
System.debug("Content as string: " + response.contentAsString);
statusCode = response.statusCode;
System.log("Status code: " + statusCode);
System.sleep(10*1000) //wait for job to start

//get last build number 
var requestUrl = "/job/" + jobName + "/api/json";
System.debug("Request full URL: " + requestUrl);
var request = RESTHost.createRequest("GET", requestUrl);
request.contentType = "application/xml";
response = request.execute();
System.debug("Content as string: " + response.contentAsString);
statusCode = response.statusCode;
System.log("Status code: " + statusCode);
var runId = JSON.parse(response.contentAsString).lastBuild.number
System.log("runId: " + runId);

//wait for the job to finiss
//TODO: a detection if job fail!!!
do {
	var requestUrl = "/job/" + jobName + "/"+runId+"/api/json";
	System.debug("Request full URL: " + requestUrl);
	var request = RESTHost.createRequest("GET", requestUrl);
	request.contentType = "application/xml";
	response = request.execute();
	var patt = new RegExp("SUCCESS");
	var status = JSON.parse(response.contentAsString).result;
	System.log("Status: " + status);
	var finish = patt.test(status);
	System.sleep(5*1000); //5s sleep
}
while(!finish);

//Get console text and parse
var requestUrl = "/job/" + jobName + "/"+runId+"/consoleText/api/json";
System.debug("Request full URL: " + requestUrl);
var request = RESTHost.createRequest("GET", requestUrl);
request.contentType = "application/xml";
response = request.execute();
System.debug("Content as string: " + response.contentAsString);
statusCode = response.statusCode;
System.log("Status code: " + statusCode);

//Console log processing if required
for each (var line in  response.contentAsString.split("\n")){
		output = "TODO" // HERE CONSOLE LOG PROCESSING;
	}
}
return output;


