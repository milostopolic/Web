var useredit_url = "../Project/webapi/users/useredit"
var loggeduser_url = "../Project/webapi/users/loggeduser"

$(document).on("submit", "#usereditForm", function(e) {
	e.preventDefault();
	
	$.ajax({
		type : 'POST',
		url : useredit_url,
    contentType : 'application/json',
		dataType : "json",
    data:formToJSON(),
		success : function(data) {
			alert("SUCCESS");
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("ERROR");
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

function loadUser() {
	$.ajax({
		type : 'GET',
		url : loggeduser_url,
    contentType : 'application/json',
		
		success : function(data) {
			alert("SUCCESS");
			console.log(data.username);
			$('#username').val(data.username);
			$('#password').val(data.password);
			$('#name').val(data.name);
			$('#surname').val(data.surname);
			$('#username').val(data.username);
			$('#contact').val(data.contact);
			$('#email').val(data.email);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("ERROR");
		}
	});
}