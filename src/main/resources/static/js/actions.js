
$(document).on("click", ".rounds_prog", function(){
	
	var action = $(this).attr("title");
	var round = $(this).attr("data-round");
	
	var collection;
	
	switch(round) {
	case "1":
	case "2":
		collection = "quals";
		break;
		// TODO
	}
	
	$.ajax({
		url: "/rest/ops/" + collection + "/" + round + "/" + action,
		method: "POST",
		success: function() {
			location.reload();
		}
	});
	
})