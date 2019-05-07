# CRMSignature
Add in the ability to make a multiline text field a signature field

The code is in the 

	src

folder.

We ship the component with it "CRMSignature.zip".
-To create your own Sage CRM component zip up the contents of the src folder. 

To install then import via Sage CRM's Component Manager. 
This creates a folder in your CustomPages folder called

	CRMSignature

When installed a new menu item is created in the 

	Administration

area of Sage CRM called
  
	CRM Together OS
  
	OS=Open Source

Within this there is a tab called 

	CRMSignature
  
Click this and add in your fields you wish to make use the CRMSignature editor. 
Note that you should have created a new mutli-line text field to be used as the CRMSignature field. 

For example create a field on cases called
	case_c_signature
and add this to the 
	CaseDetailBox 
screen. 

The in the editor set the array code to contain our field(s)

EG 
Single Field
	["case_c_signature"]
	  
EG
Multiple fields
	["case_c_signature","case_c_signature2"]
	

Save this (click update) and this the creates a file in the 

    WWWRoot\js\custom\CRMSignature.js
	
which searches for these fields and applys the screen update. 

FYI

We use the amazing Signature pad code (also open source)

https://github.com/szimek/signature_pad

