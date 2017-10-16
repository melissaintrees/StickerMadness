var topics = ["pumpkin", "goblin", "ghost", "candy", "hauntedhouse", "monsters", "devils", "spooky"];


// Your app should take the topics in this array and create buttons in your HTML.
// Try using a loop that appends a button for each string in the array.
function createButtons() {
  for (var i = 0; i < topics.length; i++ ){
      console.log(topics[i]);
      // create a button div
      var b = $("<button>");
      // add an class called buttons
      b.addClass("buttons");
      // add a data attribute
      b.attr("data-name", topics[i]);
      // add the text to the buttons
      b.text(topics[i]);
      // Add button to the Html button-holder div
      $("#button-holder").append(b);
  }
}

createButtons();
// When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

$("button").on("click", function(event) {

  var halloween = $(this).attr("data-name");
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + halloween + "&api_key=SIBUreqeKQeIBbZsMZbEinHIO3ZVH8lL&limit=10";

  $.ajax ({
    url: queryURL,
    method: "GET"
  }).done(function (response) {

    console.log(queryURL);
    var result = response.data;
    console.log(response);

    for (var i = 0; i < result.length; i++){
      console.log(response.data[i].images.fixed_height_still.url);
      var halloweenDiv = $("<div>");
      // create and store an image tag
      var halloweenImage = $("<img>");
      // add an img attribute of src and pass the collected response to it
      halloweenImage.attr("src", response.data[i].images.fixed_height_still.url);

      halloweenDiv.append(halloweenImage);

      $("#hallow-gif-image").prepend(halloweenDiv);
      }
  });




});

