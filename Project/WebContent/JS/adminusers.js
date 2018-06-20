var users_url = "../Project/webapi/users"
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
				        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
				          <a class="dropdown-item" href="#">User page</a>				          
				          <div class="dropdown-divider"></div>
				          <a class="dropdown-item" href="#" id="signOut">Sign out</a>
				        </div>
				      </li>			      
				    </ul>`);
			if(data.role === 'ADMIN'){
				$("#listaID").append(`<li class="nav-item"><button class="btn btn-outline-success my-2 my-sm-0" onClick="usersClick()">Users</button></li>`)
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

function loadUsers() {
	$.ajax({
		type : 'GET',
		url : users_url,
    contentType : 'application/json',
    	success: function(data){
    		$("usersTableID").empty();    		
    		for(let i = 0; i < data.length; i++){    			
    			$("#usersTableID").append(`<tr><th>` + data[i].username + `</th>
    			<td>`+ data[i].name +`</td>
    			<td>`+ data[i].surname +`</td>
    			<td><select id="`+data[i].username+`" class="form-control selekcija"><option value="CUSTOMER">CUSTOMER</option>
    			<option value="DELIVERY">DELIVERY</option>
    			<option value="ADMIN">ADMIN</option></select></td></tr>`);
    			$('#'+data[i].username+' option:contains('+data[i].role+')').prop('selected',true);
    			if(data[i].role == 'ADMIN') {    				
    				$('#' +data[i].username).attr('disabled', 'disabled');
    			}
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