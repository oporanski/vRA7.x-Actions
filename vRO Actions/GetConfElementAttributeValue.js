//Params:
// - path:string - Config elements path (path/to/config/)
// - elementName:string - Config element name
// - attribName:string - Attribute Name 
//Return:Number
//Find configuration element in a patch and get atribute value 

user = user.split("@")[0];
System.log("USER: " + user);

var configElement = undefined;
for each(configElement in Server.getConfigurationElementCategoryWithPath(path).configurationElements){
	System.debug("configElement.name: " + configElement.name);
	if(configElement.name.indexOf(elementName) == 0){
		break;
	}
}
System.debug("configElement: " + configElement);
var attrib = configElement.getAttributeWithKey(attribName);
System.log("@Value: " + attrib.value)
return attrib.value;
