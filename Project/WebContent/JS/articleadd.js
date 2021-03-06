var articleadd_url = "../Project/webapi/articles"
var articles_url = "../Project/webapi/articles"
var loggeduser_url = "../Project/webapi/users/loggeduser"
var logout_url = "../Project/webapi/users/logout"
var restaurants_url = "../Project/webapi/restaurants"
var loggedUser
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