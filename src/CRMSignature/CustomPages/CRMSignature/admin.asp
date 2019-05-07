<!-- #include file ="sagecrm.js" -->
<%

var forReading = 1, forWriting = 2, forAppending = 8;
var newline="<br>";
var newlinetext="\n";

//get the setting from custom_sysparams
var sql="select * from custom_sysparams where parm_name='ctos_crmsignature' and parm_deleted is null";
var sqlq=CRM.CreateQueryObj(sql);
sqlq.SelectSQL();

if (CRM.Mode==2)
{
  //save....insert or update
  if (sqlq.eof)
  {
    //insert
	var idb=CRM.CreateRecord("custom_sysparams");
	idb("parm_name")="ctos_crmsignature";
	idb("parm_value")=Request.Form("fieldstoflag");
	idb.SaveChanges();
  }else{
    //update
	var idb=CRM.FindRecord("custom_sysparams","parm_name='ctos_crmsignature' and parm_deleted is null");
	idb("parm_value")=Request.Form("fieldstoflag");
	idb.SaveChanges();	
  }
  sql="select * from custom_sysparams where parm_name='ctos_crmsignature' and parm_deleted is null";
  sqlq=CRM.CreateQueryObj(sql);
  sqlq.SelectSQL();
  //update the file and replace [!HTMLFIELDS] with our code
  var fs=Server.CreateObject("Scripting.FileSystemObject");
  var TemplateFileName=Request.ServerVariables("APPL_PHYSICAL_PATH")+"\CustomPages\\CRMSignature\\CRMSignature_template.js";
  var NewFileName=Request.ServerVariables("APPL_PHYSICAL_PATH")+"\\js\\custom\\CRMSignature.js";
  var lineData="";
  if (fs.FileExists(TemplateFileName)==true)
  {
		var f = fs.CopyFile(TemplateFileName, NewFileName);    
		// Open the file 
		var is = fs.OpenTextFile(NewFileName, forReading, true );
		// start and continue to read until we hit
		// the end of the file. 
		while( !is.AtEndOfStream ){
			lineData  += is.ReadLine()+newlinetext;
		}
		// Close the stream 
		is.Close();
		lineData=lineData.replace("[!HTMLFIELDS]",sqlq("parm_value"));
		var flOutput = fs.CreateTextFile(NewFileName, true); //true for overwrite
		flOutput.Write(lineData);
		flOutput.Close();
  }
}else if (CRM.Mode==3)
{
  //reset
  var idb=CRM.FindRecord("custom_sysparams","parm_name='ctos_crmsignature' and parm_deleted is null");
  idb.DeleteRecord = true;
  idb.SaveChanges();	
  sql="select * from custom_sysparams where parm_name='ctos_crmsignature' and parm_deleted is null";
  sqlq=CRM.CreateQueryObj(sql);
  sqlq.SelectSQL();
}

var CurrentUser=CRM.GetContextInfo("user", "User_logon");
CurrentUser=CurrentUser.toLowerCase();
var CurrentUserName=CRM.GetContextInfo("user", "User_firstname");
var CurrentUserEmail=CRM.GetContextInfo("user", "User_emailaddress");

Container=CRM.GetBlock("container");
Container.DisplayButton(Button_Default) =false;
Container.DisplayForm = true;

content=eWare.GetBlock('content');
content.contents = newline+"Hi "+CurrentUserName;
content.contents +=newline+"Welcome to the CRM Together Open Source page for the <b>CRM Signature</b>.";
content.contents +=newline+"This will enable your system to make Sage CRM multi-line text fields act as signature fields.";
content.contents +=newline+"Regards";
content.contents +=newline+"The CRM Together Open Source Team"+newline+newline;

Container.AddBlock(content);

btnUpdate= eWare.Button("Update", "", "javascript:updateinfo()");
Container.AddButton(btnUpdate);
	 
btnSend = eWare.Button("Email CRM Together", "", "mailto:sagecrm@crmtogether.com?subject=CRM Together Open Source CRM Signature");
Container.AddButton(btnSend);

if (!sqlq.eof)
{
	btnReset= eWare.Button("Reset", "", "javascript:resetallhtmlflags()");
	Container.AddButton(btnReset);
}

content.contents+="<textarea class=\"EDIT\" name=\"fieldstoflag\" id=\"fieldstoflag\" rows=\"20\" cols=\"90\">"

if (sqlq.eof)
{
  //put in sample code
  content.contents+="ARRAY STRUCTURE. EDIT AS NEEDED AND REMOVE THIS LINE"+newlinetext+newlinetext;
  content.contents+='["case_c_signature", "case_c_signature2"]';
}else{
  content.contents+=sqlq("parm_value");
}

content.contents+="</textarea>";

CRM.AddContent(Container.Execute());

Response.Write(CRM.GetPage('CRMTogetherOS'));

%>

<script>
//ref: https://stackoverflow.com/questions/3710204/how-to-check-if-a-string-is-a-valid-json-string-in-javascript-without-using-try
function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function updateinfo(){
	if (window.confirm("Do you really want to update? This cannot be undone")) { 
	  document.getElementsByName("em")[0].value="2";
	  document.forms[0].submit();
	}
}

function resetallhtmlflags()
{
	if (window.confirm("Do you really want to reset? This cannot be undone")) { 
	  document.getElementsByName("em")[0].value="3";
	  document.forms[0].submit();
	}
}





</script>