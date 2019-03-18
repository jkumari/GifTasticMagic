// Use ready() to make a function available after the document is loaded.
// on click event on add-gif button- add the gif input to master array
// on click event on gif btn- pull data using public APIs and displays still gifs
// on click on still-gif will call animate gif function
// makeButtons function- to create button by readying the master array of inputs gifs
$(document).ready(function () {
	var arrayList = ["Dog", "Cat", "Bird", "Owl", "Rat"]
	var results;
	// MAKE BUTTONS	AND ADD ONCLICK FUNCTION
	function makeButtons() {
		$("#gif-buttons").empty();
		for (i = 0; i < arrayList.length; i++) {
			var b = $("<button>");
			b.addClass("character-btn");
			b.attr("data-name", arrayList[i]);
			b.text(arrayList[i]);
			$("#gif-buttons").append(b);
		};
	};

	$("#add-gifs").on("click", function (event) {
		event.preventDefault();
		var character = $("#gif-input").val().trim();
		arrayList.push(character);
		$("#gif-input").val("");
		makeButtons();
	});
	//FUNCTION FOR GRABBING GIPHY API CONTENT
	function dataPull() {
		var characterName = $(this).attr("data-name");
		var characterStr = characterName.split(" ").join("+");
		var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + characterStr + "&api_key=dc6zaTOxFJmzC&limit=10";
		console.log(giphyURL);
		$.ajax({
			url: giphyURL,
			method: "GET"
		}).done(function (response) {
			results = response.data;
			$("#gifs").empty();
			for (var i = 0; i < results.length; i++) {
				var characterDiv = $("<div>");
				var para = $("<p class='rating'>").text("Rating: " + results[i].rating);
				var characterImage = $("<img>");
				para.addClass("rating-text")
				characterImage.addClass("image-gifs")
				characterImage.attr("src", results[i].images.fixed_height_still.url);
				characterImage.attr("data-state", "still");
				characterImage.attr("data-position", i);
				characterDiv.append(para);
				characterDiv.append(characterImage);
				characterDiv.addClass("individual-gifs")
				$("#gifs").prepend(characterDiv);
			}; //ENDS FOR LOOP
		}); // ENDS AJAX FUNCTION
	};

	// Use document on click function to apply function for elements AFTER the page has loaded
	$(document).on("click", ".character-btn", dataPull);
	// ANIMATE GIFS
	function gifAnimation() {
		var state = $(this).attr("data-state");
		var position = $(this).attr("data-position"); //will return a string
		position = parseInt(position); //string to integer
		if (state === "still") {
			$(this).attr("src", results[position].images.fixed_height.url);
			$(this).attr("data-state", "animate");
		} else {
			$(this).attr("src", results[position].images.fixed_height_still.url);
			$(this).attr("data-state", "still");
		}
	};

	$(document).on("click", ".image-gifs", gifAnimation);
	makeButtons();
}); //document.ready 