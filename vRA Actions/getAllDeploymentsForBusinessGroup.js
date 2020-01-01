//Params:
// - deploymentName:string - vRA Deployment (blueprint) Name 
// - bgName:string - Business Group Name
// - vCACHostName - name of the VCACCAFE:VCACHost endpoint to use 
//Return:Number
// Gets number of specyfic deployeds for a Business Group

var ret = [];
var vraHost = null;
//get host
var cafeHosts = Server.findAllForType("VCACCAFE:VCACHost");
if (!cafeHosts[0]){throw "ERROR - Unable to find Host";}
for each (var cafeHost in cafeHosts){
	System.debug("Host Name: " + cafeHost.name)
  	if(cafeHost.name.indexOf(vCACHostName) == 0){
    	vraHost = cafeHost;
    	break;
  	}
}
//get deployments
var deployments = vCACCAFEEntitiesFinder.getCatalogResources(vraHost);
System.debug("Deployments found: " + deployments.length);
for each (var dpl in deployments){
	try{
		var label = dpl.catalogItem.getLabel("label");
	}catch(e){label =""}
	System.debug("Deployment name: " + dpl.name);
	System.debug("Deployment label: " + label);
	var regex = RegExp("^" + deploymentName.trim() + "$");
	if (regex.test(label)){
		var subTenent = dpl.organization.getSubtenantLabel().toString();
		var regex = RegExp("^" + bgName.trim() + "$");
		if(regex.test(subTenent)){
			System.debug("Deployment status: " + dpl.requestState.value());
			var status = dpl.requestState.value().toString();
			if (status.indexOf("FAILED") == -1){
				ret.push(dpl);
			}
		}
	}
}
return ret.length;