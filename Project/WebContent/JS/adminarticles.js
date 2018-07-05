var articles_url = "../Project/webapi/articles"
var loggeduser_url = "../Project/webapi/users/loggeduser"
var logout_url = "../Project/webapi/users/logout"
var ordersCart_url = "../Project/webapi/orders/cart"
var loggedUser
var orders_url = "../Project/webapi/orders"

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



function loadArticles() {
	$.ajax({
		type : 'GET',
		url : articles_url,
    contentType : 'application/json',
    	success: function(data){
    		$("#articlesTableID").empty();    		
    		for(let i = 0; i < data.length; i++){    			
    			$("#articlesTableID").append(`<tr><th>` + data[i].name + `</th>
    			<td>`+ data[i].price +`</td>
    			<td>`+ data[i].restaurant +`</td>
    			<td>`+ data[i].description +`</td>
    			<td>`+ data[i].quantity +`</td>
    			<td>` + data[i].type + `</td>
    			<td>
    <img class="editovanje" id="`+ data[i].name +`" style="margin-left:5px; cursor:pointer" height="24" width="24" src="images/edit.png" alt="appropriate alternative text goes here">
    				</td>
    			<td>
    <img class="brisanje" id="` + data[i].name + `" style="margin-left:5px; cursor:pointer" height="24" width="24" src="images/delete.png" alt="appropriate alternative text goes here">
    			</td>
    			<td>
    <img class="dodavanje" id="` + data[i].name + `" style="margin-left:5px; cursor:pointer" height="24" width="24" src="images/cart.png" alt="appropriate alternative text goes here">
    			</td></tr>`);
    			//$('#'+data[i].name+' option:contains('+data[i].type+')').prop('selected',true);    			
    		}
    	},     	
    	error: function(){
    		
    	}});
}

/*$(document).on('change', '.selekcija', function(){
	var id = ($(this).attr('id'));
	var selected = $(this).val();
	$.ajax({
		type: 'GET',
		url : "../Project/webapi/users/changerole/"+selected+"/"+id,
		contentType : 'application/json',
		success: function() {},
		error:function() {}
	})
	
});*/

/*$(document).on('click', '.dodavanje', function() {	
	window.location.href="articleedit.html";
});*/

$(document).on('click', '.editovanje', function() {
	var id = ($(this).attr('id'));
	sessionStorage.setItem('editingArticle', id);
	window.location.href="articleedit.html";
});

$(document).on('click', '.brisanje', function() {
	var id = ($(this).attr('id'));	
	$.ajax({
		type: 'DELETE',
		url : "../Project/webapi/articles/"+id,
		contentType : 'application/json',
		success: function() {
			toastr.success("Article deleted.");
			loadArticles();
		},
		error:function() {}
	})
});

$(document).on('click', '.dodavanje', function() {
	var id = $(this).attr("id");
	$.ajax({
		type : 'POST',
		url : ordersCart_url,
    contentType : 'application/json',
    data:JSON.stringify({	
        "article":id,
        /*"restaurant": sessionStorage.getItem('restaurantDetails')   */
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
	loadCart();
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
		$("#modal-footer").append(`<button onclick="order()" class="btn btn-success">Order</button>`);
		
	} else {
		$("#modal-body").append(`<p>Your cart is empty.</p>`);
	}
	
	
}

$(document).on('change', '.quant', function(){
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

function order() {
	var veh = $("#vehicles").val();
	$.ajax({
		type : 'POST',
		url : "../Project/webapi/orders/createadminorder/" + veh,
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
					loadCart();
				},
				error: function() {
					
				}
			});
		},
		error:function() {}
	})
});