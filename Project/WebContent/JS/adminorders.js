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
			if(data.role != 'ADMIN') {
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
				$("#dropID").append(`<a href="adminusers.html" style="cursor:pointer" class="dropdown-item">Users</a>`);
				$("#dropID").append(`<a href="adminarticles.html" style="cursor:pointer" class="dropdown-item">Articles</a>`);
				$("#dropID").append(`<a href="adminvehicles.html" style="cursor:pointer" class="dropdown-item">Vehicles</a>`);
				$("#dropID").append(`<a href="adminrestaurants.html" style="cursor:pointer" class="dropdown-item">Restaurants</a>`);
				$("#dropID").append(`<a href="adminorders.html" style="cursor:pointer" class="dropdown-item">Orders</a>`);
				$("#dropID").append(`<div class="dropdown-divider"></div>`);
				$("#dropID").append(`<a style="cursor:pointer" class="dropdown-item" onClick="adminCartClick()">Admin cart</a>`);
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


function loadOrders() {
	//if(loggedUser.vehicle == '') {
		$.ajax({
			type : 'GET',
			url : orders_url,
	    contentType : 'application/json',
	    	success: function(data){
	    		$("#ordersTable").empty();    		
	    		for(let i = 0; i < data.length; i++){    			
	    			$("#ordersTable").append(`<tr><th>` + data[i].dateTime + `</th>
	    			<td>`+ data[i].buyer +`</td>
	    			<td>`+ data[i].deliverer +`</td>
	    			<td>`+ data[i].totalPrice +` RSD</td>
	    			<td>`+ data[i].note +`</td>
	    			<td>`+ data[i].status +`</td>
	    			<td> <img class="brisanje" id="` + data[i].id + `" style="margin-left:5px; cursor:pointer" height="24" width="24" src="images/delete.png" alt="appropriate alternative text goes here"></td>
	    			</tr>`);    			
	    		}    		
	    	},     	
	    	error: function(){
	    		
	    	}});
	/*} else {
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
	}*/
}

$(document).on('click', '.brisanje', function() {
	var id = ($(this).attr('id'));	
	$.ajax({
		type: 'DELETE',
		url : "../Project/webapi/orders/"+id,
		contentType : 'application/json',
		success: function() {
			toastr.success("Order deleted.");
			loadOrders();
		},
		error:function() {}
	})
});

