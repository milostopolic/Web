var login_url = "../Project/webapi/users/login"
var loggeduser_url = "../Project/webapi/users/loggeduser"
var logout_url = "../Project/webapi/users/logout"
var restaurants_url = "../Project/webapi/restaurants"
	
var ordersCart_url = "../Project/webapi/orders/cart"
var loggedUser

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
			loadRestaurant();
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
			loggedUser = data;
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
				
			} else if(data.role == 'CUSTOMER') {
				$("#dropID").append(`<a class="dropdown-item" href="userpage.html">User page</a>`);
				$("#dropID").append(`<a class="dropdown-item" id="cartClick" style="cursor:pointer" onclick="loadCart()" data-toggle="modal" data-target="#exampleModal">My cart</a>`);
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
		error : function() {
			window.location.href="mainpage.html";
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
    	for(let i = 0; i < data.length; i++) {
    		$("#art-cards").append(`<div class="card" style="width: 18rem;margin-top:20px">
    				<div id="title`+ i+`" class="card-body">
  				  <h5 class="card-title">`+ data[i].name +`</h5>
  				  <h6 class="card-subtitle mb-2 text-muted">`+ data[i].price +` RSD</h6>
  				  <p class="card-text">`+ data[i].description +`</p>				  
  				</div> 
  				</div>`);
    		if(loggedUser != null) {
				if(loggedUser.role == 'CUSTOMER') {
					$("#title"+ i).append(`<img style="cursor:pointer" id="`+ data[i].name +`" class="float-right cartClass" src="images/cart.png"></img>`);
				}
			}
    	}
    },
    error : function() {}
  });
}

$(document).on('click', '.cardsClass', function(){
	sessionStorage.setItem("restaurantDetails", $(this).attr("id"));
	window.location.href="restaurant.html";
});

$(document).on('click', '.cartClass', function() {
	var id = $(this).attr("id");
	$.ajax({
		type : 'POST',
		url : ordersCart_url,
    contentType : 'application/json',
    data:JSON.stringify({	
        "article":id,
        "restaurant": sessionStorage.getItem('restaurantDetails')   
    	}),
    
		success : function(data) {
			alert("SUCCESS");
			loadNavbar()
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("ERROR");
		}
	});
});

function loadCart(){
	$("#modal-body").empty();
	$("#modal-footer").empty();
	if(loggedUser.cart.items.length > 0) {
		$("#modal-body").append(`<table class="table">
		  <thead class="thead-light">
		    <tr>
		      <th scope="col">Article</th>
		      <th scope="col">Unit price</th>
		      <th scope="col">Quantity</th>
		      <th scope="col"></th>
		    </tr>
		  </thead>
		  <tbody id="cartTable">
		    
		  </tbody>
		</table>`);
		for(let i = 0; i < loggedUser.cart.items.length; i++) {
			$("#cartTable").append(`<tr>
			<th>`+ loggedUser.cart.items[i].article +`</th><td>`+ loggedUser.cart.items[i].price +`</td>
			<td><input style="max-width:50px" class="quant" id="` +loggedUser.cart.items[i].article + `" onkeydown="return false" min="1" max="10" type="number" value="`+loggedUser.cart.items[i].quantity +`"></td>
			<td><img class="brisanje" id="` +loggedUser.cart.items[i].article + `" style="margin-left:5px; cursor:pointer" height="24" witdh="24" src="images/delete.png" alt="appropriate alternative text goes here"></td>
			</tr>`);
		}
		$("#modal-body").append(`<p>Total price: `+ loggedUser.cart.totalPrice +`</p>`);
		$("#modal-footer").append(`<input id="note" class="form-control mr-sm-2" type="text" placeholder="Note"/>`);
		$("#modal-footer").append(`<button onclick="order()" class="btn btn-success">Order</button>`);
		
	} else {
		$("#modal-body").append(`<p>Your cart is empty.</p>`);
	}
	
	
}

$(document).on('click', '.brisanje', function() {
	var id = ($(this).attr('id'));	
	$.ajax({
		type: 'DELETE',
		url : "../Project/webapi/orders/deleteitem/"+id,
		contentType : 'application/json',
		success: function() {
			$.ajax({
				type : 'GET',
				url : loggeduser_url,
		    contentType : 'application/json',
		    
				success : function(data) {
					loggedUser = data;
					loadCart();
				},
				error: function() {
					
				}
			});
		},
		error:function() {}
	})
});

$(document).on('change', '.quant', function(){
	var id = ($(this).attr('id'));
	var q = ($(this).val());
	console.log(q);	
	$.ajax({
		type: 'POST',
		url: orders_url + "changequantity/" + id + "/" + q,
		success: function() {
			$.ajax({
				type : 'GET',
				url : loggeduser_url,
		    contentType : 'application/json',
		    
				success : function(data) {
					loggedUser = data;
					loadCart();
				},
				error: function() {
					
				}
			});
			
		},
		error:function(){
			
		}
	})
	
});

function order() {
	$.ajax({
		type : 'POST',
		url : orders_url,
    contentType : 'application/json',
		dataType : "json",
    data:orderToJSON(),
		success : function(data) {
			alert("SUCCESS");
			loadNavbar();
			$('#exampleModal').modal('toggle');
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("ERROR");
		}
	});
};

function orderToJSON() {
	return JSON.stringify({	
    "note":$('#note').val(),
    "items":loggedUser.cart.items,
    "totalPrice":loggedUser.cart.totalPrice
	});
}