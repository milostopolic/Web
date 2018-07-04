var register_url = "../Project/webapi/users"
var loggeduser_url = "../Project/webapi/users/loggeduser"
var login_url = "../Project/webapi/users/login"

$(document).on("submit", "#registrationForm", function(e) {
	e.preventDefault();
	
	$.ajax({
		type : 'POST',
		url : register_url,
    contentType : 'application/json',
		dataType : "json",
    data:formToJSON(),
		success : function(data) {
			console.log(data.username);
			console.log(data.name);
			console.log(data.contact);
			toastr.success("Successfully registered.");
			window.location.href="mainpage.html";
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		}
	});
});

function formToJSON() {
	return JSON.stringify({	
    "username":$('#username2').val(),
    "password":$('#password2').val(),
    "name":$('#name').val(),
	"surname":$('#surname').val(),
	"contact":$('#contact').val(),
	"email":$('#email').val()
	});
}

function loadNavbar() {
	$.ajax({
		type : 'GET',
		url : loggeduser_url,
    contentType : 'application/json',
		
		success : function(data) {
			window.location.href="mainpage.html";
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {			
			$("#navbarTogglerDemo03").empty();
			$("#navbarTogglerDemo03").append(`<ul class="navbar-nav mr-auto mt-2 mt-lg-0">      
            
    </ul>
    <form class="form-inline my-2 my-lg-0" id="loginForm">
      <input class="form-control mr-sm-2" type="text" placeholder="Username" aria-label="Username" id="username">
      <input class="form-control mr-sm-2" type="password" placeholder="Password" aria-label="Password" id="password">
      <input class="btn btn-outline-success my-2 my-sm-0" type="submit" value="Log in"></input>
    </form>`)
		}
	});
}

$(document).on("submit", "#loginForm", function(e) {
	e.preventDefault();
	
	$.ajax({
		type : 'POST',
		url : login_url,
    contentType : 'application/json',
		dataType : "json",
    data:formToJSONLog(),
		success : function(data) {
			toastr.success("Successfully logged in.");
			window.location.href="mainpage.html";
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			toastr.error("Invalid username/password.");
		}
	});
});

function goToMain() {
	//window.location.href="mainpage.html";
}

function formToJSONLog() {
	return JSON.stringify({	
    "username":$('#username').val(),
    "password":$('#password').val()    
	});
}