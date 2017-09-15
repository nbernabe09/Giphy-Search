// Variables
var topics = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];

function displayGiphy() {
	var topic = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=355651bd3b534a1bbfddb31e12a67a41&q=" + topic + "&limit=10&offset=0&rating=PG-13&lang=en";
	// var apiKey = "355651bd3b534a1bbfddb31e12a67a41";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		console.log(response);
		$("#giphy-view").html("");
		for (var i = 0; i < response.data.length; i++) {
			var newDiv = $("<div>");
			newDiv.addClass("giphy-pic");
			newDiv.append("<p>Rating: " + response.data[i].rating + "</p>");
			newDiv.append("<div><img class='gif' src='" + response.data[i].images.fixed_height_still.url + "' data-still='" + response.data[i].images.fixed_height_still.url + "' data-animate='" + response.data[i].images.fixed_height.url + "' data-state='still'></div>");
			$("#giphy-view").append(newDiv);
		}
		var newDiv = $("<div>");
		newDiv.css("clear", "both");
		$("#giphy-view").append(newDiv);
	});
}

function renderButtons() {
	$("#btn-view").empty();
	for (var i = 0; i < topics.length; i++) {
		var a = $("<button>");
		a.addClass("topic btn btn-info");
		a.attr("data-name", topics[i]);
		a.text(topics[i]);
		$("#btn-view").append(a);
	}
}
$("#add-giphy").on("click", function(event) {
	event.preventDefault();
	var topic = $("#giphy-input").val().trim();
	if (topic === "") {
		return
	}
	if (!topics.includes(topic)) {
		topics.push(topic);
	}
	renderButtons();
});

$(document).on("click", ".topic", displayGiphy);

$(document).on("click", ".gif", function() {
	var state = $(this).attr("data-state");
	var src, newState;
	if (state === "still") {
		src = $(this).attr("data-animate");
		newState = "animate";
	} else {
		src = $(this).attr("data-still");
		newState = "still";
	}
	$(this).attr("src", src);
	$(this).attr("data-state", newState);
});

renderButtons();