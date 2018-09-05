
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
	case "5":
		collection = "playoffs";
		round = "quarterfinals";
		break;
	case "6":
		collection = "playoffs";
		round = "semifinals";
		break;
	case "7":
		collection = "playoffs";
		round = "finals";
		break;
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

