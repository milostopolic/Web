var login_url = "../Project/webapi/users/login"
var loggeduser_url = "../Project/webapi/users/loggeduser"
var logout_url = "../Project/webapi/users/logout"
var restaurants_url = "../Project/webapi/restaurants"

$(document).on("submit", "#loginForm", function(e) {
	e.preventDefault();
	
	$.ajax({
		type : 'POST',
		url : login_url,
    contentType : 'application/json',
		dataType : "json",
    data:formToJSON(),
		success : function(data) {
			alert("SUCCESS");
			loadNavbar();
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("ERROR");
		}
	});
});

function formToJSON() {
	return JSON.stringify({	
    "username":$('#username').val(),
    "password":$('#password').val()    
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
			if(data.role == 'ADMIN'){
				//$("#listaID").append(`<li class="nav-item"><button class="btn btn-outline-success my-2 my-sm-0" onClick="usersClick()">Users</button></li>`)
				$("#dropID").append(`<a style="cursor:pointer" class="dropdown-item" onClick="usersClick()">Users</a>`);
				$("#dropID").append(`<a style="cursor:pointer" class="dropdown-item" onClick="articlesClick()">Articles</a>`);
				$("#dropID").append(`<a style="cursor:pointer" class="dropdown-item" onClick="vehiclesClick()">Vehicles</a>`);
				$("#dropID").append(`<a style="cursor:pointer" class="dropdown-item" onClick="restaurantsClick()">Restaurants</a>`);
				
			} else {
				$("#dropID").append(`<a class="dropdown-item" href="userpage.html">User page</a>`);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			$("#navbarTogglerDemo03").empty();
			$("#navbarTogglerDemo03").append(`<ul class="navbar-nav mr-auto mt-2 mt-lg-0">      
      <li class="nav-item">
        <a class="nav-link" href="register.html">Register</a>
      </li>      
    </ul>
    <form class="form-inline my-2 my-lg-0" id="loginForm">
      <input class="form-control mr-sm-2" type="text" placeholder="Username" aria-label="Username" id="username">
      <input class="form-control mr-sm-2" type="password" placeholder="Password" aria-label="Password" id="password">
      <input class="btn btn-outline-success my-2 my-sm-0" type="submit" value="Log in"></input>
    </form>`);
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

function loadRestaurant() {
	var id = sessionStorage.getItem('restaurantDetails');
	$.ajax({
		type : 'GET',
		url : restaurants_url+"/"+id,
    contentType : 'application/json',
		
		success : function(data) {
			
			$("#cards").empty();
						
							
			$("#cards").append(`<div class="card" style="width: 18rem;margin-top:20px;background:#E3F1F7">
				<div class="card-body">
				  <h5 class="card-title">`+ data.name +`</h5>
				  <h6 class="card-subtitle mb-2 text-muted">`+ data.address +`</h6>
				  <p class="card-text">`+ data.category +`</p>				  
				</div> 
				</div>`);
			
			loadArticles();
			
			}
				/*if(data.role == 'ADMIN'){
					//$("#listaID").append(`<li class="nav-item"><button class="btn btn-outline-success my-2 my-sm-0" onClick="usersClick()">Users</button></li>`)
					$("#dropID").append(`<a style="cursor:pointer" class="dropdown-item" onClick="usersClick()">Users</a>`);
					$("#dropID").append(`<a style="cursor:pointer" class="dropdown-item" onClick="articlesClick()">Articles</a>`);
					$("#dropID").append(`<a style="cursor:pointer" class="dropdown-item" onClick="vehiclesClick()">Vehicles</a>`);
					$("#dropID").append(`<a style="cursor:pointer" class="dropdown-item" onClick="restaurantsClick()">Restaurants</a>`);
					
				} else {
					$("#dropID").append(`<a class="dropdown-item" href="#">User page</a>`);
				}*/
			
		,
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			$("#navbarTogglerDemo03").empty();
			$("#navbarTogglerDemo03").append(`<ul class="navbar-nav mr-auto mt-2 mt-lg-0">      
      <li class="nav-item">
        <a class="nav-link" href="register.html">Register</a>
      </li>      
    </ul>
    <form class="form-inline my-2 my-lg-0" id="loginForm">
      <input class="form-control mr-sm-2" type="text" placeholder="Username" aria-label="Username" id="username">
      <input class="form-control mr-sm-2" type="password" placeholder="Password" aria-label="Password" id="password">
      <input class="btn btn-outline-success my-2 my-sm-0" type="submit" value="Log in"></input>
    </form>`);
		}
	});
}

function loadArticles() {
	var id = sessionStorage.getItem('restaurantDetails');
	$.ajax({
		type : 'GET',
		url : restaurants_url+"/restaurant/"+id,
    contentType : 'application/json',
    success : function(data) {
    	$("#art-cards").empty();
    	for(var art of data) {
    		$("#art-cards").append(`<div class="card" style="width: 18rem;margin-top:20px">
    				<div class="card-body">
  				  <h5 class="card-title">`+ art.name +`</h5>
  				  <h6 class="card-subtitle mb-2 text-muted">`+ art.price +` RSD</h6>
  				  <p class="card-text">`+ art.description +`</p>				  
  				</div> 
  				</div>`);
    	}
    },
    error : function() {}
  });
}

$(document).on('click', '.cardsClass', function(){
	sessionStorage.setItem("restaurantDetails", $(this).attr("id"));
	window.location.href="restaurant.html";
});