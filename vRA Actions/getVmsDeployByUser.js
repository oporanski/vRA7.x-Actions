//Params:
// - user:string
//Return:Number
// Gets number of VMs deployed by specyfic user (user maped to DeployedFor)

var host = Server.findAllForType("vCAC:VCACHost")[0];
var model = 'ManagementModelEntities.svc';
var entitySet = 'VirtualMachines';
var entitySetProperties = "VirtualMachineProperties";
var orderBy = 'VirtualMachineName asc';
var filter = "IsTemplate eq false and InitiatorType eq 'Cloned'"
var allVMs = [];

//get all entities which match the filter
var entities = vCACEntityManager.readModelEntitiesBySystemQuery(host.id, model, entitySet, filter, orderBy, null, null, 0, null);
System.debug("Found entities total: " + entities.length)
for each (var entity in entities) {              
	var vCACVm = entity.getInventoryObject();
    var vmName = vCACVm.virtualMachineName;
    System.debug("VM Name: " + vmName)               
    var VirtualMachineEntity = vCACVm.getEntity()
    var ownerEntity = VirtualMachineEntity.getLink(host,"Owner")[0];
    var vmOwner = ownerEntity.getProperty("UserName");
    System.debug("VM Owner: " + vmOwner);
	if(vmOwner.indexOf(user) == 0){
		allVMs.push(vmName);
	}               
}
System.debug("Deployed VMs Number: " + allVMs.length);
return allVMs.length;
