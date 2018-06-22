var articleadd_url = "../Project/webapi/articles"
var loggeduser_url = "../Project/webapi/users/loggeduser"
var articleedit_url = "../Project/webapi/articles/articleedit"

$(document).on("submit", "#articleeditForm", function(e) {
	e.preventDefault();
	alert("PORUKAA");
	
	$.ajax({
		type : 'POST',
		url : articleedit_url,
    contentType : 'application/json',
		dataType : "json",
    data:formToJSON(),
		success : function(data) {
			/*$("#paragraph").append(`Name je: ` +data.name);
			$("#paragraph").append(` quantity je: ` +data.quantity);*/
			window.location.href="adminarticles.html";
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("AJAX ERROR: " + errorThrown+"register");
		}
	});
});

function formToJSON() {
	return JSON.stringify({	
    "name":$('#name').val(),
    "price":$('#price').val(),
    "description":$('#description').val(),
	"quantity":$('#quantity').val(),
	"type":$('#type').val()	
	});
}

function loadArticle() {
	var id = sessionStorage.getItem('editingArticle');
	$.ajax({
		type : 'GET',
		url : "../Project/webapi/articles/"+id,
    contentType : 'application/json',
		
		success : function(data) {
			alert("SUCCESS");
			console.log(data.username);
			$('#name').val(data.name);
			$('#price').val(data.price);
			$('#description').val(data.description);
			$('#quantity').val(data.quantity);
			$('#type').val(data.type);			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("ERROR");
		}
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
				$("#dropID").append(`<a style="cursor:pointer" class="dropdown-item" onClick="usersClick()">Users</a>`);
				$("#dropID").append(`<a style="cursor:pointer" class="dropdown-item" onClick="articlesClick()">Articles</a>`);
			} else {
				$("#dropID").append(`<a class="dropdown-item" href="#">User page</a>`);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			window.location.href="mainpage.html";
		}
	});
}

function usersClick() {
	window.location.href="adminusers.html";
}

function articlesClick() {
	window.location.href="adminarticles.html";
}