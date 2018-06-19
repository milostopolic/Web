var register_url = "../Project/webapi/users"

$(document).on("submit", "#registrationForm", function(e) {
	e.preventDefault();
	alert("PORUKAA");
	
	$.ajax({
		type : 'POST',
		url : register_url,
    contentType : 'application/json',
		dataType : "json",
    data:formToJSON(),
		success : function(data) {
			$("#paragraph").append(`Username je: ` +data.username);
			$("#paragraph").append(` contact je: ` +data.contact);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("AJAX ERROR: " + errorThrown+"register");
		}
	});
});

function formToJSON() {
	return JSON.stringify({	
    "username":$('#username').val(),
    "password":$('#password').val(),
    "name":$('#name').val(),
	"surname":$('#surname').val(),
	"contact":$('#contact').val(),
	"email":$('#email').val()
	});
}