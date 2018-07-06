var login_url = "../Project/webapi/users/login"
var loggeduser_url = "../Project/webapi/users/loggeduser"
var logout_url = "../Project/webapi/users/logout"
var getrestaurants_url = "../Project/webapi/users/favrestaurants"
var fav_url = "../Project/webapi/users/favrestaurant"
var ordersbyuser_url = "../Project/webapi/orders/ordersbyuser"
var orders_url = "../Project/webapi/orders"
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
	loadOrders();
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

function loadOrders() {
	$.ajax({
		type : 'GET',
		url : ordersbyuser_url,
    contentType : 'application/json',
		
		success : function(data) {
			
			$("#cards").empty();
			for(let i = 0; i < data.length; i++) {				
								
				$("#cards").append(`<div class="card" style="width: 18rem;margin-top:20px">
					<div id="title`+i+`" class="card-body">
					  <h5 class="card-title">`+ data[i].dateTime +`</h5>
					  <h6 class="card-subtitle mb-2 text-muted">`+ data[i].status +`</h6>
					  <p class="card-text">`+ data[i].totalPrice +` RSD</p>
					  <a style="cursor:pointer;color:blue" id="`+data[i].id+`" class="card-link artClass">Order items</a>
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

$(document).on('click', '.artClass', function(){
	var id = $(this).attr('id');
	$.ajax({
		type : 'GET',
		url : orders_url + "/getitems/" + id,
		contentType : 'application/json',
		
		success : function(data) {
			$('#exampleModal').modal('toggle');
			$("#modal-title").empty();
			$("#modal-title").append(`Order items`);
			$("#modal-body").empty();
			$("#modal-footer").empty();
			if(data.length > 0) {
				$("#modal-body").append(`<table class="table">
				  <thead class="thead-light">
				    <tr>
				      <th scope="col">Article</th>
				      <th scope="col">Unit price</th>
				      <th scope="col">Quantity</th>
				      <th scope="col">Restaurant</th>
				    </tr>
				  </thead>
				  <tbody id="cartTable">
				    
				  </tbody>
				</table>`);
				for(let i = 0; i < data.length; i++) {
					$("#cartTable").append(`<tr>
					<th>`+ data[i].article +`</th><td>`+ data[i].price +`</td>
					<td>` +data[i].quantity + `</td>
					<td>` +data[i].restaurant + `</td>					
					</tr>`);
				}
				
			} else {
				$("#modal-body").append(`<p>Order is empty.</p>`);
			}
			
		},
		error : function() {
			
		}
	});
	
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

function loadCart(){
	$("#modal-title").empty();
	$("#modal-title").append(`Cart`);
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
			toastr.success("Order placed.");
			loadNavbar();
			$('#exampleModal').modal('toggle');
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
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