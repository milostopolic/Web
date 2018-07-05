var articleadd_url = "../Project/webapi/articles"
var articles_url = "../Project/webapi/articles"
var loggeduser_url = "../Project/webapi/users/loggeduser"
var logout_url = "../Project/webapi/users/logout"
var restaurants_url = "../Project/webapi/restaurants"

var restorani=null;

$(document).on("submit", "#articleaddForm", function(e) {
	e.preventDefault();		
	$.ajax({
		type : 'POST',
		url : articleadd_url,
    contentType : 'application/json',
		dataType : "json",
    data:formToJSON(),
		success : function(data) {
			
			toastr.success("Article added.");
			window.location.href="adminarticles.html";
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			
		}
	});
});

function formToJSON() {
	var arrayOfObjects = [];
	
	return JSON.stringify({	
    "name":$('#name').val(),
    "price":$('#price').val(),
    "description":$('#description').val(),
	"quantity":$('#quantity').val(),
	"type":$('#type').val(),
	"restaurant":$('#restaurants').val()
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
				$("#dropID").append(`<a href="adminusers.html" style="cursor:pointer" class="dropdown-item">Users</a>`);
				$("#dropID").append(`<a href="adminarticles.html" style="cursor:pointer" class="dropdown-item">Articles</a>`);
				$("#dropID").append(`<a href="adminvehicles.html" style="cursor:pointer" class="dropdown-item">Vehicles</a>`);
				$("#dropID").append(`<a href="adminrestaurants.html" style="cursor:pointer" class="dropdown-item">Restaurants</a>`);
				$("#dropID").append(`<a href="adminorders.html" style="cursor:pointer" class="dropdown-item">Orders</a>`);
				$("#dropID").append(`<div class="dropdown-divider"></div>`);
				$("#dropID").append(`<a style="cursor:pointer" class="dropdown-item" onClick="adminCartClick()">Admin cart</a>`);
				
			} else {
				$("#dropID").append(`<a class="dropdown-item" href="#">User page</a>`);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			window.location.href="mainpage.html";
		}
	});
}

$(document).on('click', '#signOut', function(){
	$.ajax({
		type : 'GET',
		url : logout_url,
    contentType : 'application/json',
    	success: function(){
    		loadNavbar();
    	},     	
    	error: function(){
    		
    	}});
});


function loadRestaurants() {
	$.ajax({
		type : 'GET',
		url : restaurants_url,
    contentType : 'application/json',
		
		success : function(data) {
			restorani = data;
			$("#restaurants").empty();
			for(var i = 0; i < data.length; i++) {
				$("#restaurants").append(`<option value="`+data[i].name+`">`+data[i].name+`</option>`);
			}
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			
		}
	});
}

