
$(document).on("click", ".rounds_prog", function(){
	
	var action = $(this).attr("title");
	var round = $(this).attr("data-round");
	
	var collection;
	
	switch(round) {
	case "1":
	case "2":
		collection = "quals";
		break;
	case "3":
		collection = "groups";
		round = "12";
		break;
	case "4":
		collection = "groups";
		round = "8";
		break;
		// TODO
	case "4":
		collection = "playoffs";
		round = "quarterfinals";
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

$(document).on("click", ".play_games", function(){
	
	$.ajax({
		url: "/rest/ops/fillGames",
		method: "POST",
		success: function() {
			location.reload();
		}
	});
	
});

