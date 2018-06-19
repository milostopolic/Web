var articleadd_url = "../Project/webapi/articles"
//var articleedit_url = "../Project/webapi/articleedit"

$(document).on("submit", "#articleeditForm", function(e) {
	e.preventDefault();
	alert("PORUKAA");
	
	$.ajax({
		type : 'POST',
		url : articleadd_url,
    contentType : 'application/json',
		dataType : "json",
    data:formToJSON(),
		success : function(data) {
			$("#paragraph").append(`Name je: ` +data.name);
			$("#paragraph").append(` quantity je: ` +data.quantity);
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
	$.ajax({
		type : 'GET',
		//url : loggeduser_url,
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