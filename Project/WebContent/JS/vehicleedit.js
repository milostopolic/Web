var articleadd_url = "../Project/webapi/articles"
var loggeduser_url = "../Project/webapi/users/loggeduser"
var vehicleedit_url = "../Project/webapi/vehicles/vehicleedit"

$(document).on("submit", "#vehicleeditForm", function(e) {
	e.preventDefault();
	
	$.ajax({
		type : 'POST',
		url : vehicleedit_url,
    contentType : 'application/json',
		dataType : "json",
    data:formToJSON(),
		success : function(data) {
			toastr.success("Vehicle edited.");
			window.location.href="adminvehicles.html";
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		}
	});
});

function formToJSON() {
	return JSON.stringify({	
    "maker":$('#maker').val(),
    "model":$('#model').val(),
    "type":$('#type').val(),
	"registration":$('#registration').val(),
	"year":$('#year').val(),
	"note":$('#note').val()
	});
}

function loadVehicle() {
	var id = sessionStorage.getItem('editingVehicle');
	$.ajax({
		type : 'GET',
		url : "../Project/webapi/vehicles/"+id,
    contentType : 'application/json',
		
		success : function(data) {
			console.log(data.model);
			$('#maker').val(data.maker);
			$('#model').val(data.model);
			$('#type').val(data.type);
			$('#registration').val(data.registration);
			$('#year').val(data.year);
			$('#note').val(data.note);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		}
	});
}

function loadNavbar() {
	$.ajax({
		type : 'GET',
		url : loggeduser_url,
    contentType : 'application/json',
		
		success : function(data) {
			console.log(data.role);
			$("#navbarTogglerDemo03").empty();
			$("#navbarTogglerDemo03").append(`<ul class="navbar-nav ml-auto mt-2 mt-lg-0"  id="listaID">			      
				      
				      <li class="nav-item dropdown">
				        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				          Hello, `+ data.username +`
				        </a>
				        <div id="dropID" class="dropdown-menu" aria-labelledby="navbarDropdown">
				          <a class="dropdown-item" href="#" id="signOut">Sign out</a>				          
				          <div class="dropdown-divider"></div>
				          
				        </div>
				      </li>			      
				    </ul>`);
			if(data.role === 'ADMIN'){
				$("#dropID").append(`<a style="cursor:pointer" class="dropdown-item" onClick="usersClick()">Users</a>`);
				$("#dropID").append(`<a style="cursor:pointer" class="dropdown-item" onClick="articlesClick()">Articles</a>`);
				$("#dropID").append(`<a style="cursor:pointer" class="dropdown-item" onClick="vehiclesClick()">Vehicles</a>`);
				$("#dropID").append(`<a style="cursor:pointer" class="dropdown-item" onClick="restaurantsClick()">Restaurants</a>`);
			} else {
				$("#dropID").append(`<a class="dropdown-item" href="#">User page</a>`);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			window.location.href="mainpage.html";
		}
	});
}

function usersClick() {
	window.location.href="adminusers.html";
}

function articlesClick() {
	window.location.href="adminarticles.html";
}

function vehiclesClick() {
	window.location.href="adminvehicles.html";
}

function restaurantsClick() {
	window.location.href="adminrestaurants.html";
}