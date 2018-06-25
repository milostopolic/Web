var login_url = "../Project/webapi/users/login"
var loggeduser_url = "../Project/webapi/users/loggeduser"
var logout_url = "../Project/webapi/users/logout"
var getrestaurants_url = "../Project/webapi/users/favrestaurants"
var fav_url = "../Project/webapi/users/favrestaurant"
var loggedUser


function loadNavbar() {
	
	$.ajax({
		type : 'GET',
		url : loggeduser_url,
    contentType : 'application/json',
		
		success : function(data) {
			loggedUser = data;
			loadRestaurants();
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
		error : function() {
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

$(document).on('click', '#fav-tab', function(){	
	loadRestaurants()
});

$(document).on('click', '#orders-tab', function(){	
	
});


function loadRestaurants() {
	$.ajax({
		type : 'GET',
		url : getrestaurants_url,
    contentType : 'application/json',
		
		success : function(data) {
			
			$("#cards").empty();
			for(let i = 0; i < data.length; i++) {				
								
				$("#cards").append(`<div class="card" style="width: 18rem;margin-top:20px">
					<div id="title`+i+`" class="card-body">
					  <h5 class="card-title">`+ data[i].name +`</h5>
					  <h6 class="card-subtitle mb-2 text-muted">`+ data[i].address +`</h6>
					  <p class="card-text">`+ data[i].category +`</p>
					  <a style="cursor:pointer;color:blue" id="`+data[i].name+`" class="card-link cardsClass">Details</a>
					  <!--a href="#" class="card-link">Another link</a-->
					</div> 
					</div>`);
				
				/*if(loggedUser != null) {
					if(loggedUser.role == 'CUSTOMER') {
						$("#title"+ i).append(`<img id="`+ data[i].name +`" class="float-right starClass" src="images/star.png"></img>`);
					}
				}*/
					
				
				
			}
		},
		error : function() {
			
		}
	});
}

$(document).on('click', '.cardsClass', function(){
	sessionStorage.setItem("restaurantDetails", $(this).attr("id"));
	window.location.href="restaurant.html";
});

/*$(document).on('click', '.starClass', function(){
	var id = $(this).attr("id");
	$.ajax({
		type : 'POST',
		url : fav_url+"/" + id,
    contentType : 'application/json',
    	success: function(){
    		loadNavbar();
    		toastr.success("Restaurant added to favourites.");
    	},     	
    	error: function(){
    		toastr.warning("Restaurant is already added to favourites.");
    	}});
});*/