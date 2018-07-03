var users_url = "../Project/webapi/users"
var loggeduser_url = "../Project/webapi/users/loggeduser"
var logout_url = "../Project/webapi/users/logout"
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
			console.log(data.role);
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
	$.ajax({
		type : 'GET',
		url : orders_url + "/getordersfordelivery",
    contentType : 'application/json',
    	success: function(data){
    		$("#ordersTable").empty();    		
    		for(let i = 0; i < data.length; i++){    			
    			$("#ordersTable").append(`<tr><th>` + data[i].dateTime + `</th>
    			<td>`+ data[i].buyer +`</td>
    			<td>`+ data[i].totalPrice +`</td>
    			<td>`+ data[i].note +`</td>
    			<!--td><select id="`+data[i].username+`" class="form-control selekcija"><option value="CUSTOMER">CUSTOMER</option>
    			<option value="DELIVERY">DELIVERY</option>
    			<option value="ADMIN">ADMIN</option></select></td--></tr>`);
    			/*$('#'+data[i].username+' option:contains('+data[i].role+')').prop('selected',true);
    			if(data[i].role == 'ADMIN') {    				
    				$('#' +data[i].username).attr('disabled', 'disabled');
    			}*/
    		}
    	},     	
    	error: function(){
    		
    	}});
}

$(document).on('change', '.selekcija', function(){
	var id = ($(this).attr('id'));
	var selected = $(this).val();
	$.ajax({
		type: 'GET',
		url : "../Project/webapi/users/changerole/"+selected+"/"+id,
		contentType : 'application/json',
		success: function() {},
		error:function() {}
	})
	
});