// Variables
var animals = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];

function displayGiphy() {
	var animal = $(this).attr("data-name");
	var queryURL = "";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {

	});
}

function renderButtons() {
	$("#btn-view").empty();
	for (var i = 0; i < animals.length; i++) {
		var a = $("<button>");
		a.addClass("animal btn btn-info");
		a.attr("data-name", animals[i]);
		a.text(animals[i]);
		$("#btn-view").append(a);
	}
}
$("#add-giphy").on("click", function(event) {
	event.preventDefault();
	var animal = $("#giphy-input").val().trim();
	if (animal === "") {
		return
	}
	if (!animals.includes(animal)) {
		animals.push(animal);
	}
	renderButtons();
});

$(document).on("click", ".animal", displayGiphy);

renderButtons();