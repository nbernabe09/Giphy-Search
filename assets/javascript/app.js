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
			newDiv = $("<div>");
			newDiv.append("<p>Rating: " + response.data[i].rating + "</p>");
			newDiv.append("<div><img src='" + response.data[i].images.fixed_height_still.url + "'></div>");
			$("#giphy-view").append(newDiv);
		}
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

renderButtons();