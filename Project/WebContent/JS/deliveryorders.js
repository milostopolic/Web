var users_url = "../Project/webapi/users"
var loggeduser_url = "../Project/webapi/users/loggeduser"
var logout_url = "../Project/webapi/users/logout"
var orders_url = "../Project/webapi/orders"
var loggedUser

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
			loggedUser = data;
			if(data.role != 'DELIVERY') {
				window.location.href="mainpage.html";
			}
			loadOrders();
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
			} else if(data.role === 'DELIVERY') {
				$("#dropID").append(`<a class="dropdown-item" href="deliveryorders.html">Orders</a>`);
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

function loadOrders() {
	if(loggedUser.vehicle == '') {
		$.ajax({
			type : 'GET',
			url : orders_url + "/getordersfordelivery",
	    contentType : 'application/json',
	    	success: function(data){
	    		$("#ordersTable").empty();    		
	    		for(let i = 0; i < data.length; i++){    			
	    			$("#ordersTable").append(`<tr><th>` + data[i].dateTime + `</th>
	    			<td>`+ data[i].buyer +`</td>
	    			<td>`+ data[i].totalPrice +` RSD</td>
	    			<td>`+ data[i].note +`</td>
	    			<td><button class="btn btn-success preuzimanje" id="`+data[i].id+`">Take order</button></td>
	    			</tr>`);    			
	    		}    		
	    	},     	
	    	error: function(){
	    		
	    	}});
	} else {
		$.ajax({
			type: 'GET',
			url: orders_url + "/activeorder",
			contentType : 'application/json',
			success: function(data) {
				$("#ordersTable").empty();    		
	    		    			
    			$("#ordersTable").append(`<tr><th>` + data.dateTime + `</th>
    			<td>`+ data.buyer +`</td>
    			<td>`+ data.totalPrice +` RSD</td>
    			<td>`+ data.note +`</td>
    			<td><button class="btn btn-success dostavljanje" id="`+data.id+`">Deliver</button></td>
    			</tr>`);    			
	    		   		
			},
			error: function() {}
		});
	}
}

$(document).on('click', '.dostavljanje', function() {
	
	$.ajax({
		type: 'POST',
		url: orders_url + "/deliverorder",
		contentType : 'application/json',
		success: function(data) {
			toastr.success("Order delivered");
			loadNavbar();    		   		
		},
		error: function() {}
	})
	
});



$(document).on('click', '.preuzimanje', function(){
	var id = ($(this).attr('id'));
	console.log(id);
	$('#exampleModal').modal('toggle');
	$('#modal-body').empty();
	$('#modal-footer').empty();	
	
	$.ajax({
		type: 'GET',
		url : "../Project/webapi/vehicles/freevehicles/",
		contentType : 'application/json',
		success: function(data) {
			if(data.length > 0) {
				$('#modal-body').append(`<p>Take vehicle: </p>
				<select class="form-control selektovanje">`);
				for(let i = 0; i < data.length; i++) {
					$('.selektovanje').append(`<option value="`+ data[i].model +`">`+ data[i].maker + ` ` + data[i].model + `</option>`);
				}
				$('#modal-body').append(`</select>`);
				
				$('#modal-footer').append(`<button class="btn btn-success confirmBtn" id="`+ id +`">Confirm</button>`);	
			} else {
				$('#modal-body').append(`<p>No free vehicles.</p>`);
			}
		},
		error:function() {}
	})	
});

$(document).on('click', ".confirmBtn", function(){
	var veh = $(".selektovanje").val();
	var id = $(this).attr('id');
	/*console.log(veh);
	console.log(id);*/
	
	$.ajax({
		type: 'POST',
		url: "../Project/webapi/orders/takeorder/" + id + "/" + veh,
		contentType : 'application/json',
		success: function() {
			$('#exampleModal').modal('toggle');
			toastr.success("Order taken.");
			loadNavbar();
		},
		error: function() {}
	});
});


