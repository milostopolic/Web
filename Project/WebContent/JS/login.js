var login_url = "../Project/webapi/users/login"
var loggeduser_url = "../Project/webapi/users/loggeduser"
var logout_url = "../Project/webapi/users/logout"
var restaurants_url = "../Project/webapi/restaurants"
var fav_url = "../Project/webapi/users/favrestaurant"
var orders_url = "../Project/webapi/orders"
var ordersCart_url = "../Project/webapi/orders/cart"
var loggedUser
var searchSource = new Array()



$(document).on("submit", "#loginForm", function(e) {
	e.preventDefault();
	
	$.ajax({
		type : 'POST',
		url : login_url,
    contentType : 'application/json',
		dataType : "json",
    data:formToJSON(),
		success : function(data) {	
			toastr.success("Successfully logged in.");
			loadNavbar();
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			toastr.error("Invalid username/password.");
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
			//loadRestaurants('DOMESTIC');
			loadPopularArticles();
			console.log(data.role);
			$("#navbarTogglerDemo03").empty();
			//$("#navbarTogglerDemo03").append(`<input class="search" type="text"/><button class="searchBtn">Search</button>`);
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
				$("#dropID").append(`<a href="adminusers.html" style="cursor:pointer" class="dropdown-item">Users</a>`);
				$("#dropID").append(`<a href="adminarticles.html" style="cursor:pointer" class="dropdown-item">Articles</a>`);
				$("#dropID").append(`<a href="adminvehicles.html" style="cursor:pointer" class="dropdown-item">Vehicles</a>`);
				$("#dropID").append(`<a href="adminrestaurants.html" style="cursor:pointer" class="dropdown-item">Restaurants</a>`);
				$("#dropID").append(`<a href="adminorders.html" style="cursor:pointer" class="dropdown-item">Orders</a>`);
				$("#dropID").append(`<div class="dropdown-divider"></div>`);
				$("#dropID").append(`<a style="cursor:pointer" class="dropdown-item" onClick="adminCartClick()">Admin cart</a>`);
			} else if(data.role == 'CUSTOMER') {
				$("#dropID").append(`<a class="dropdown-item" href="userpage.html">User page</a>`);
				$("#dropID").append(`<a class="dropdown-item" id="cartClick" style="cursor:pointer" onclick="loadCart()" data-toggle="modal" data-target="#exampleModal">My cart</a>`);
			} else if(data.role == 'DELIVERY') {
				$("#dropID").append(`<a class="dropdown-item" href="deliveryorders.html">Orders</a>`);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			loggedUser = null;
			$("#navbarTogglerDemo03").empty();
			//$("#navbarTogglerDemo03").append(`<input class="search" type="text"/><button class="searchBtn">Search</button>`);
			$("#navbarTogglerDemo03").append(`<ul class="navbar-nav mr-auto mt-2 mt-lg-0">      
      <li class="nav-item">
        <a style="margin-left:100px" class="nav-link" href="register.html">Register</a>
      </li>      
    </ul>
    <form class="form-inline my-2 my-lg-0" id="loginForm">
      <input class="form-control mr-sm-2" type="text" placeholder="Username" aria-label="Username" id="username">
      <input class="form-control mr-sm-2" type="password" placeholder="Password" aria-label="Password" id="password">
      <input class="btn btn-outline-success my-2 my-sm-0" type="submit" value="Log in"></input>
    </form>`);
			//loadRestaurants('DOMESTIC');
			loadPopularArticles();
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

$(document).on('click', '#domestic-tab', function(){	
	loadRestaurants("DOMESTIC");
});

$(document).on('click', '#barbeque-tab', function(){	
	loadRestaurants("BARBEQUE");
});

$(document).on('click', '#chinese-tab', function(){	
	loadRestaurants("CHINESE");
});

$(document).on('click', '#indian-tab', function(){	
	loadRestaurants("INDIAN");
});

$(document).on('click', '#pastry-tab', function(){	
	loadRestaurants("PASTRY");
});

$(document).on('click', '#pizzeria-tab', function(){	
	loadRestaurants("PIZZERIA");
});

$(document).on('click', '#mostpopular-tab', function(){	
	loadPopularArticles();
});


function loadRestaurants(category) {
	searchSource = [];
	$.ajax({
		type : 'GET',
		url : restaurants_url,
    contentType : 'application/json',
		
		success : function(data) {
			
			$("#pop").empty();
			$("#cards").empty();
			for(let i = 0; i < data.length; i++) {	
				searchSource.push(data[i].name);
				if(data[i].category == category) {				
					$("#cards").append(`<div class="card" style="width: 18rem;margin-top:20px">
						<div id="title`+i+`" class="card-body">
						  <h5 class="card-title">`+ data[i].name +`</h5>
						  <h6 class="card-subtitle mb-2 text-muted">`+ data[i].address +`</h6>
						  <p class="card-text">`+ data[i].category +`</p>
						  <a style="cursor:pointer;color:blue" id="`+data[i].name+`" class="card-link cardsClass">Details</a>
						  <!--a href="#" class="card-link">Another link</a-->
						</div> 
						</div>`);
					
					if(loggedUser != null) {
						if(loggedUser.role == 'CUSTOMER') {
							$("#title"+ i).append(`<img id="`+ data[i].name +`" class="float-right starClass" src="images/star.png"></img>`);
						}
					}
					
				}
				
			}
		},
		error : function() {
			
		}
		
	});
	console.log(searchSource);
	$(".search").autocomplete({source:searchSource});
}

$(document).on('click', '.cardsClass', function(){
	sessionStorage.setItem("restaurantDetails", $(this).attr("id"));
	window.location.href="restaurant.html";
});

$(document).on('click', '.starClass', function(){
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
});

$(document).on('click', '.searchBtn', function(){
	if($('.search').val() != "") {
		sessionStorage.setItem("restaurantDetails", $('.search').val());
		window.location.href="restaurant.html";
	}	
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
		$("#modal-body").append(`<p>Total price: `+ loggedUser.cart.tempPrice +`</p>`);
		$("#modal-body").append(`<div class="form-group row">
				  <label for="bonus" class="col-6 col-form-label float-right">Use bonus points: </label>
				  <div class="col-4">
				    <input onkeydown="return false" value="`+loggedUser.cart.usedBonus+`" min="0" max="`+loggedUser.bonus+`" type="number" class="form-control float-right quantBonus" id="bonus">
				  </div>
				  <div class="col-2"><button class="btn btn-success" id="applyBonus">Apply</button></div>
				</div>`);
		$("#modal-footer").append(`<input id="note" class="form-control mr-sm-2" type="text" placeholder="Note"/>`);
		$("#modal-footer").append(`<button onclick="order()" class="btn btn-success">Order</button>`);
		if(loggedUser.cart.usedBonus > 0) {
			$("#applyBonus").prop("disabled",true);
		}
	} else {
		$("#modal-body").append(`<p>Your cart is empty.</p>`);
	}
	
	
}

$(document).on('click', '#applyBonus', function(){	
	var q = ($("#bonus").val());
	console.log(q);	
	$.ajax({
		type: 'POST',
		url: orders_url + "/changebonus/" + q,
		success: function(data) {
			loggedUser = data;
			loadCart();
		},
		error:function(){
			
		}
	})
	
});


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
		url: orders_url + "/changequantity/" + id + "/" + q,
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
			console.log(data);
			toastr.success("Order placed.");
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
    "totalPrice":loggedUser.cart.tempPrice,
    "usedBonus" : $('#bonus').val()
	});
}

function loadPopularArticles(){
	$("#pop").empty();
	$("#cards").empty();
	$("#myTab>li>a.active").removeClass("active");
	$("#mostpopular-tab").addClass("active");
	$.ajax({
		type: 'GET',
		url: "../Project/webapi/articles/getarticlesbypopularity",
		contentType : 'application/json',
		success: function(data) {
			var limit;
			if(data.length < 10) {
				limit = data.length;
			} else {
				limit = 10;
			}
			
			$("#pop").append(`<table class="table table-striped">
								  <thead>
								    <tr>
								      <th scope="col">#</th>
								      <th scope="col">Article</th>
								      <th scope="col">Price</th>
								      <th scope="col">Restaurant</th>
								      <th scope="col">Times ordered</th>
								      <th scope="col"></th>
								    </tr>
								  </thead>
								  <tbody id="poptable">
								  </tbody>`);
			for(let i = 0; i < limit; i++) {
				let j = i+1;
				
				if(loggedUser != null) {
					if(loggedUser.role == 'CUSTOMER') {
						$("#poptable").append(`<tr>
								<td>`+j+`</td>
								<td>`+data[i].name+`</td>
								<td>`+data[i].price+`</td>
								<td>`+data[i].restaurant+`</td>
								<td>`+data[i].popularity+`</td>
								<td><img style="cursor:pointer" id="`+ data[i].name +`" class="korpice"  src="images/cart.png"></img></td>				
								</tr>`);
					} else {
						$("#poptable").append(`<tr>
								<td>`+j+`</td>
								<td>`+data[i].name+`</td>
								<td>`+data[i].price+`</td>
								<td>`+data[i].restaurant+`</td>
								<td>`+data[i].popularity+`</td>
								</tr>`);
					}
				} else {
					$("#poptable").append(`<tr>
							<td>`+j+`</td>
							<td>`+data[i].name+`</td>
							<td>`+data[i].price+`</td>
							<td>`+data[i].restaurant+`</td>
							<td>`+data[i].popularity+`</td>
							</tr>`);
				}
				
				
			}
			
		},
		error: function() {}
		
	});	
}

$(document).on('click', '.korpice', function() {
	var id = $(this).attr("id");
	$.ajax({
		type : 'POST',
		url : ordersCart_url,
    contentType : 'application/json',
    data:JSON.stringify({	
        "article":id
        /*"restaurant": sessionStorage.getItem('restaurantDetails')  */ 
    	}),
    
		success : function(data) {
			toastr.success("Added to cart.");
			loadNavbar()
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			toastr.warn("Already added to cart.");
		}
	});
});

function adminCartClick() {
	$('#exampleModal').modal('toggle');
	loadCartData();
}

function loadCartData() {
	loadCartAdmin();
	$.ajax({
		type: 'GET',
		url: "../Project/webapi/users",
		contentType : 'application/json',
		success: function(data) {
			for(let us of data) {
				if(us.role == 'CUSTOMER') {
					$("#buyer").append(`<option value="`+us.username+`">`+us.username+`</option>`);
				}
				if(us.role == 'DELIVERY') {
					if(us.vehicle == '')
						$("#deliverer").append(`<option value="`+us.username+`">`+us.username+`</option>`);
				}
			}
			
			$.ajax({
				type: 'GET',
				url: "../Project/webapi/vehicles/freevehicles",
				contentType : 'application/json',
				success: function(data) {
					for(let veh of data) {
						$("#vehicles").append(`<option value="`+veh.model+`">`+veh.maker + ` `+ veh.model +`</option>`);
					}
					
				},
				error: function() {}
				
			});
		},
		error: function() {
			
		}
	});
}

function loadCartAdmin(){
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
			<td><input style="max-width:50px" class="quantAdmin" id="` +loggedUser.cart.items[i].article + `" onkeydown="return false" min="1" max="10" type="number" value="`+loggedUser.cart.items[i].quantity +`"></td>
			<td><img class="brisanjeCart" id="` +loggedUser.cart.items[i].article + `" style="margin-left:5px; cursor:pointer" height="24" witdh="24" src="images/delete.png" alt="appropriate alternative text goes here"></td>
			</tr>`);
		}
		$("#modal-body").append(`<p>Total price: `+ loggedUser.cart.totalPrice +`</p>`);
		$("#modal-body").append(`<div class="form-group row">
				  <label for="buyer" class="col-2 col-form-label">Buyer</label>
				  <div class="col-10">
				    <select class="form-control" id="buyer">
				  </div>
				</div>`);
		$("#modal-body").append(`<div class="form-group row">
				  <label for="deliverer" class="col-2 col-form-label">Deliverer</label>
				  <div class="col-10">
				    <select class="form-control" id="deliverer">
				  </div>
				</div>`);
		$("#modal-body").append(`<div class="form-group row">
				  <label for="vehicles" class="col-2 col-form-label">Vehicle</label>
				  <div class="col-10">
				    <select class="form-control" id="vehicles">
				  </div>
				</div>`);
		$("#modal-footer").append(`<input id="note" class="form-control mr-sm-2" type="text" placeholder="Note"/>`);
		$("#modal-footer").append(`<button onclick="orderAdmin()" class="btn btn-success">Order</button>`);
		
	} else {
		$("#modal-body").append(`<p>Your cart is empty.</p>`);
	}
	
	
}

$(document).on('change', '.quantAdmin', function(){
	var id = ($(this).attr('id'));
	var q = ($(this).val());
	console.log(q);	
	$.ajax({
		type: 'POST',
		url: "../Project/webapi/orders/changequantity/" + id + "/" + q,
		success: function() {
			$.ajax({
				type : 'GET',
				url : loggeduser_url,
		    contentType : 'application/json',
		    
				success : function(data) {
					loggedUser = data;
					loadCartData();
				},
				error: function() {
					
				}
			});
			
		},
		error:function(){
			
		}
	})
	
});

function orderAdmin() {
	var veh = $("#vehicles").val();
	$.ajax({
		type : 'POST',
		url : "../Project/webapi/orders/createadminorder/" + veh,
    contentType : 'application/json',
		dataType : "json",
    data:orderToJSONAdmin(),
		success : function(data) {
			toastr.success("Order placed.");
			loadNavbar();
			$('#exampleModal').modal('toggle');
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		}
	});
};

function orderToJSONAdmin() {
	return JSON.stringify({	
    "buyer" : $("#buyer").val(),
    "deliverer" : $("#deliverer").val(),
	"note":$('#note').val(),
    "items":loggedUser.cart.items,
    "totalPrice":loggedUser.cart.totalPrice
	});
}

$(document).on('click', '.brisanjeCart', function() {
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
					loadCartAdmin();
				},
				error: function() {
					
				}
			});
		},
		error:function() {}
	})
});