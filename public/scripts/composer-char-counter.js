// Creates the character counter at the bottom of the new tweet form

$(document).ready(function() {

  $(".new-tweet").on("keyup", "textarea", function(event) {
    let length = $(this).val().length;
    let charRemaining = 140 - length;
    let counter = $(".new-tweet").find(".counter");
    counter.text(charRemaining);
    if (counter.text() < 0) {
      $(".counter").addClass("redText");
    } else {
      $(".counter").removeClass("redText");
    }
  });

});
