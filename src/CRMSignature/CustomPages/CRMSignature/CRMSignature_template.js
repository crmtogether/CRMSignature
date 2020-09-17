jQuery.cachedScript = function (url, options) {
    options = $.extend(options || {}, {
        dataType: "script",
        cache: true,
        url: url
    });
    return jQuery.ajax(options);
};

var fieldsArray = [!HTMLFIELDS];

var signaturePads = signatureFields = [];
function clearSignature(index) {
	var _signaturePad = signaturePads[index];
	_signaturePad.clear();
}

var _canvas_width=300;
var _canvas_height=150;
var ratio =  Math.max(window.devicePixelRatio || 1, 1);

$(document).ready(function () {	

	
	var editorReadOnly = $("#Button_Save").length == 0;	
	
	//check if we have any signature fields on the screen 		
	for (var i= 0; i< fieldsArray.length; i++) {		
		var $el = editorReadOnly ? $("#_Data" + fieldsArray[i]) : $("#" + fieldsArray[i]); 
		if ($el.length > 0) {			
			signatureFields.push($el);
		}
	}

	if (signatureFields.length > 0) {		
		
		//load signature pad js library
		$.cachedScript("../CustomPages/CRMSignature/js/signature_pad.min.js").done(function (script, textStatus) {

			//add css
			$('head').append('<link rel="stylesheet" type="text/css" href="../CustomPages/CRMSignature/css/signature-pad.css">');
		
		
			signatureFields.map(function ($el) {

				var signatureCRMFieldName  = new String($el[0].id).replace("_Data", "");

				var wrapper = document.createElement("div");
				wrapper.id = "signature-pad-" + signatureCRMFieldName;
				wrapper.className = "signature-pad";
				var canvas = document.createElement("canvas");
				wrapper.appendChild(canvas);
				canvas.width = _canvas_width;
				canvas.height = _canvas_height;
				canvas.getContext("2d").scale(ratio, ratio);
								
				if (editorReadOnly) { //---------------------------IN VIEW MODE SHOW SIGNATURE  
				
					$el.hide();
					
					document.getElementById("_Capt" + signatureCRMFieldName).appendChild(wrapper);
					
					var signaturePad = new SignaturePad(canvas, {
						backgroundColor: 'rgb(255, 255, 255)'
					});
					signaturePad.fromDataURL(crm.fields(signatureCRMFieldName).val());
					signaturePad.off();
					
				}	else { // --------------------------------------------IN EDIT MODE CAN SIGN 
					
					$el.hide();
					
					var actions = document.createElement("div");
					actions.class = "signature-pad--footer";
					actions.innerHTML = '<div class="description">Sign above</div>' +
											'<div class="signature-pad--actions">' +
												'<button type="button" class="button" onClick="clearSignature('+signaturePads.length+');crm.fields(\''+signatureCRMFieldName+'\').val(\'\');">Clear</button>' +        
											'</div>' +
										'</div>';
					wrapper.appendChild(actions);
								
					document.getElementById("_Data" + signatureCRMFieldName).appendChild(wrapper);				

					var signaturePad = new SignaturePad(canvas, {
						backgroundColor: 'rgb(255, 255, 255)'
						,onEnd: function() {
							$el.val(this.toDataURL());								
						}
					});

					if (crm.fields(signatureCRMFieldName).val() !="") {
						signaturePad.fromDataURL(crm.fields(signatureCRMFieldName).val());
					}
					
					signaturePads.push(signaturePad);

				} //end else view mode 

			}); //end map array fields

		}); //end cache script load 

	} //end if have signature fields 
});