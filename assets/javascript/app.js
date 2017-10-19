var topics = ["pumpkin", "goblin", "ghost", "candy", "trump", "monsters", "hauntedhouse", "evil"];


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

    // console.log(queryURL);
    var result = response.data;
    // console.log(response);

    for (var i = 0; i < result.length; i++){
      // console.log(result[i].images.fixed_height_still.url);
      var halloweenDiv = $("<div>");
      // create and store an image tag
      var halloweenImage = $("<img>");
      // add an img attribute of src and pass the collected response to it
      halloweenImage.attr("src", result[i].images.fixed_height_still.url);
      // add a data attribute called data-still to the img and set it to the gifphy code for a still image:
      halloweenImage.attr("data-still", result[i].images.fixed_height_still.url);
      // add a data attribute called data-animate and set it to the giphy code for animated image:
      halloweenImage.attr("data-animate", result[i].images.fixed_height.url);
      // add a data attribute called data-state to the img and set it to "still"
      halloweenImage.attr("data-state", "still");
      // append those new images to the halloween Div variable
      halloweenDiv.append(halloweenImage);
      // Under every gif, display its rating (PG, G, so on).
      // crate and store a p tag
      var halloweenRating = $("<p>");
      // add the rating from the api to the html
      halloweenRating.html("Rating: " + result[i].rating);
      // append new ratings to the halloweenDiv:
      halloweenDiv.append(halloweenRating);
      // put it on the screen
      $("#hallow-gif-image").prepend(halloweenDiv);

      }

      // When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

      // set another on click event for pressing the gifs
      $("img").on( "click", function(event) {
        // event.stopPropagation();
        var state = $(this).attr("data-state");
        // console.log(state);
        if (state === "still"){
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      // end on click
      });

    });

    // Under every gif, display its rating (PG, G, so on).

// click event function ends
});

