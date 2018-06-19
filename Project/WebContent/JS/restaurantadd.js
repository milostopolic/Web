var restaurantadd_url = "../Project/webapi/restaurants"

$(document).on("submit", "#restaurantaddForm", function(e) {
	e.preventDefault();
	alert("PORUKAA");
	
	$.ajax({
		type : 'POST',
		url : restaurantadd_url,
    contentType : 'application/json',
		dataType : "json",
    data:formToJSON(),
		success : function(data) {
			$("#paragraph").append(`name je: ` +data.name);
			$("#paragraph").append(` address je: ` +data.address);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("AJAX ERROR: " + errorThrown+"register");
		}
	});
});

function formToJSON() {
	return JSON.stringify({	
    "name":$('#name').val(),
    "address":$('#address').val(),
    "category":$('#category').val()		
	});
}