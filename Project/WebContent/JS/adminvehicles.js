var vehicles_url = "../Project/webapi/vehicles"
var loggeduser_url = "../Project/webapi/users/loggeduser"
var logout_url = "../Project/webapi/users/logout"

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



function loadVehicles() {
	$.ajax({
		type : 'GET',
		url : vehicles_url,
    contentType : 'application/json',
    	success: function(data){
    		$("#vehiclesTableID").empty();    		
    		for(let i = 0; i < data.length; i++){    			
    			$("#vehiclesTableID").append(`<tr><th>` + data[i].maker + `</th>
    			<td>`+ data[i].model +`</td>
    			<td>`+ data[i].type +`</td>
    			<td>`+ data[i].registration +`</td>
    			<td>` + data[i].year + `</td>
    			<td>` + data[i].note + `</td>
    			<td>
    <img class="editovanje" id="`+ data[i].model +`" style="margin-left:5px; cursor:pointer" height="24" witdh="24" src="images/edit.png" alt="appropriate alternative text goes here">
    				</td>
    			<td>
    <img class="brisanje" id="` + data[i].model + `" style="margin-left:5px; cursor:pointer" height="24" witdh="24" src="images/delete.png" alt="appropriate alternative text goes here">
    			</td></tr>`);
    			//$('#'+data[i].name+' option:contains('+data[i].type+')').prop('selected',true);    			
    		}
    	},     	
    	error: function(){
    		
    	}});
}



$(document).on('click', '.editovanje', function() {
	var id = ($(this).attr('id'));
	sessionStorage.setItem('editingVehicle', id);
	window.location.href="vehicleedit.html";
});

$(document).on('click', '.brisanje', function() {
	var id = ($(this).attr('id'));	
	$.ajax({
		type: 'DELETE',
		url : "../Project/webapi/vehicles/"+id,
		contentType : 'application/json',
		success: function() {
			toastr.success("Vehicle deleted.");
			loadVehicles();
		},
		error:function() {}
	})
});

