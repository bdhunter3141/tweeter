$(document).ready(function() {

  $(".new-tweet").on("keyup", "textarea", function(event) {
    let length = $(this).val().length;
    let charRemaining = 140 - length;
    let counter = $(".new-tweet").find(".counter");
    counter.text(charRemaining);
    if (counter.text() < 0) {
      counter.css("color", "red");
    }
  });

});
