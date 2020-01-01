//Params:
// - No Inputs
//Return:Properties
//Gets all empty (no connected vNIC to a vds portgroup) for available reservations for current Business Group

var dvPGs = VcPlugin.getAllDistributedVirtualPortgroups();
var blueprint = System.getContext().getParameter("__asd_composition_blueprintId");
var component = System.getContext().getParameter("__asd_composition_componentId");
var user = System.getContext().getParameter("__asd_requestedFor");
var tenant = System.getContext().getParameter("__asd_tenantRef");
var subtenantId = System.getContext().getParameter("__asd_subtenantRef")

var host = vCACCAFEHostManager.getDefaultHostForTenant();
System.log(host.name);
var reservations = System.getModule("com.vmware.vra.reservations").getReservationsForUserAndComponent(user, tenant, host, blueprint, component, subtenantId);

var applicableNetworks = new Properties();

for each(var res in reservations) {
	var extensionData = res.getExtensionData();
	if(extensionData) {
		var networks = extensionData.get("reservationNetworks");
		if(networks) {
			for each(var network in networks.getValue()) {
				var path = network.getValue().get("networkPath");
				for each (pg in dvPGs){
					if (pg.name.indexOf(path.label) > -1){
						var vms = pg.vm;
						if(vms.length == 0){								
							applicableNetworks.put(path.label, path.label);
						}
					}
				}
			}
		}
	}
}

return applicableNetworks;