var vehicleadd_url = "../Project/webapi/vehicles"

$(document).on("submit", "#vehicleaddForm", function(e) {
	e.preventDefault();
	alert("PORUKAA");
	
	$.ajax({
		type : 'POST',
		url : vehicleadd_url,
    contentType : 'application/json',
		dataType : "json",
    data:formToJSON(),
		success : function(data) {
			$("#paragraph").append(`Maker je: ` +data.maker);
			$("#paragraph").append(` model je: ` +data.model);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("AJAX ERROR: " + errorThrown+"register");
		}
	});
});

function formToJSON() {
	return JSON.stringify({	
    "maker":$('#maker').val(),
    "model":$('#model').val(),
    "type":$('#type').val(),
	"registration":$('#registration').val(),
	"note":$('#note').val()	
	});
}