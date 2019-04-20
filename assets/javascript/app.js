let topics = ["surreal", "fruit", "tropical", "birds", "dada", "popart"];

function renderButtons(){
  // preventing duplicates from forming
  $('#button-holder').empty();

  let buttonDiv = $('#button-holder');
  for (let i in topics) {
    let topicBtn = $("<button>");
    topicBtn.addClass('bubbly-button sticker-btn heart');
    topicBtn.attr("data-name", topics[i]);
    topicBtn.text(topics[i]);
    buttonDiv.append(topicBtn);
  }
}

renderButtons();

// onclicks to capture what they clicked on:

$(document).on("click", ".sticker-btn", function makeCalls (){

  var topic = $(this).attr("data-name");
  let queryURL = "https://api.giphy.com/v1/stickers/search?q=" + topic + "&api_key=SIBUreqeKQeIBbZsMZbEinHIO3ZVH8lL&limit=5&rating=pg"
  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    
    console.log(response.data[1].images.fixed_width_still.url);
    for (var i = 0; i < response.data.length; i++){
      console.log(response.data[i]);
      var mainDiv = $('#main-gif-image');
      var mainImg = $("<img>");
      var still = response.data[i].images.fixed_width_still.url;
      var anim = response.data[i].images.fixed_width.url
      var rating = response.data[i].rating
      console.log(rating)
      mainImg.attr("src", still);
      mainImg.attr("class", "sticker-img");
      mainImg.attr("data-still", still);
      mainImg.attr("data-anim", anim);
      mainDiv.append(mainImg);
      mainDiv.append("<br><br><h2 class='rating-txt'>Rated: " + rating);
    }
    // put the shit in here to parse the data and render to the screen
    // response.data[1]
    // when the user clicks on the sticker img, uses the this keyword to check if the src is the same url in datastill, and then changes to data-anim
    $(".sticker-img").on("click", function () {
      // console.log("you have just clicked on a sticker!");
      if ($(this).attr("src") === $(this).attr("data-still")) {
        // console.log("this is a still image url");
        $(this).attr("src", $(this).attr("data-anim"));
        // if it's animated and they click, then it changes back to still.
      } else {
        $(this).attr("src", $(this).attr("data-still"));
      }
      // mainImg.attr("src", anim);
    });
  });
  $("#main-gif-image").empty("");
});


 $("#add-button").on("click", function(){
   var buttonValue = $("#button-input").val().trim();
   console.log(buttonValue);
   $('#button-form')[0].reset();
   topics.push(buttonValue);
   renderButtons();
})


var animateButton = function (e) {
  e.preventDefault;
  //reset animation
  e.target.classList.remove('animate');

  e.target.classList.add('animate');
  setTimeout(function () {
    e.target.classList.remove('animate');
  }, 700);
};

var bubblyButtons = document.getElementsByClassName("bubbly-button");

for (var i = 0; i < bubblyButtons.length; i++) {
  bubblyButtons[i].addEventListener('click', animateButton, false);
}

