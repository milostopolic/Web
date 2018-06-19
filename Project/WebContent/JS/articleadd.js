var articleadd_url = "../Project/webapi/articles"

$(document).on("submit", "#articleaddForm", function(e) {
	e.preventDefault();
	alert("PORUKAA");
	
	$.ajax({
		type : 'POST',
		url : articleadd_url,
    contentType : 'application/json',
		dataType : "json",
    data:formToJSON(),
		success : function(data) {
			$("#paragraph").append(`Name je: ` +data.name);
			$("#paragraph").append(` quantity je: ` +data.quantity);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("AJAX ERROR: " + errorThrown+"register");
		}
	});
});

function formToJSON() {
	return JSON.stringify({	
    "name":$('#name').val(),
    "price":$('#price').val(),
    "description":$('#description').val(),
	"quantity":$('#quantity').val(),
	"type":$('#type').val()	
	});
}