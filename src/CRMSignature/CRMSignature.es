/*

Screen Objects that have been added or updated

*/

ObjectName='CRMTogetherOS';
ObjectType='TabGroup';
EntityName='system';
var CObjId10869 = AddScreenObject();

/*

Add in admin menu

*/

var TabsId11081 = AddCustom_Tabs(0,0,11,'Admin','CRM Together OS','customfile','CRMTogetherOS/admin.asp','','waves.gif',0,'',false,0);

var TabsId11082 = AddCustom_Tabs(0,0,1,'CRMTogetherOS','Home','customfile','CRMTogetherOS/admin.asp','','',0,'',false,0);

var TabsId11083 = AddCustom_Tabs(0,0,2,'CRMTogetherOS','CRMSignature','customfile','CRMSignature/admin.asp','','',0,'',false,0);

//copy files
var CRMTogetherOS="CRMTogetherOS";
CreateNewDir(GetDLLDir() + '\\CustomPages\\' + CRMTogetherOS);
CopyASPTo(CRMTogetherOS+'\\admin.asp','\\CustomPages\\'+CRMTogetherOS+'\\admin.asp');
CopyASPTo(CRMTogetherOS+'\\sagecrm.js','\\CustomPages\\'+CRMTogetherOS+'\\sagecrm.js');
CopyASPTo(CRMTogetherOS+'\\sagecrmnolang.js','\\CustomPages\\'+CRMTogetherOS+'\\sagecrmnolang.js');
CopyASPTo(CRMTogetherOS+'\\workflow.js','\\CustomPages\\'+CRMTogetherOS+'\\workflow.js');

var CRMSignature="CRMSignature";
CreateNewDir(GetDLLDir() + '\\CustomPages\\' + CRMSignature+'\\js');
CreateNewDir(GetDLLDir() + '\\CustomPages\\' + CRMSignature+'\\css');
CopyASPTo(CRMSignature+'\\admin.asp','\\CustomPages\\'+CRMSignature+'\\admin.asp');
CopyASPTo(CRMSignature+'\\CRMSignature_template.js','\\CustomPages\\'+CRMSignature+'\\CRMSignature_template.js');
CopyASPTo(CRMSignature+'\\sagecrm.js','\\CustomPages\\'+CRMSignature+'\\sagecrm.js');
CopyASPTo(CRMSignature+'\\sagecrmnolang.js','\\CustomPages\\'+CRMSignature+'\\sagecrmnolang.js');

CopyASPTo(CRMSignature+'\\js\\signature_pad.min.js','\\CustomPages\\'+CRMSignature+'\\js\\signature_pad.min.js');

CopyASPTo(CRMSignature+'\\css\\ie9.css','\\CustomPages\\'+CRMSignature+'\\css\\ie9.css');
CopyASPTo(CRMSignature+'\\css\\signature-pad.css','\\CustomPages\\'+CRMSignature+'\\css\\signature-pad.css');

