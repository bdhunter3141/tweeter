/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Functions ------------------------------------------------------------

// Loads the tweets from the "/tweets/" page

let loadTweets = function() {
  $("#tweet-container").empty();
  $.get("/tweets/")
    .done(function(result){
    renderTweets(result);
  })
    .fail(function(err) {
      throw err;
    });
};

// Submits the tweet

const submitTweet = function(tweetData) {
  $.post("/tweets/", tweetData)
    .done(function(result) {
      loadTweets();
    })
    .fail(function(err) {
      throw err;
    });
}

// Escapes text for safe use in tweets

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


// Dynamically creates tweet HTML

const createTweetElement = function(tweetInfo) {

  let $tweet = `
    <article class="tweet">
      <header class="tweet-header">
        <div class="avatar-div">
          <img src="${tweetInfo.user.avatars.small}" alt="Avatar" class="tweet-avatar">
        </div>
        <h1>${tweetInfo.user.name}</h1>
        <p class="header-handle">${tweetInfo.user.handle}</p>
      </header>
      <div class="tweet-content">
        <p>${escape(tweetInfo.content.text)}</p>
      </div>
      <footer class="tweet-footer">
        <p>${Math.floor((Date.now() - tweetInfo.created_at) / 86400000)} days ago</p>
        <div class="tweet-icons">
          <a href ="#""><i class="fa fa-flag" aria-hidden="true"></i></a>
          <a href ="#""><i class="fa fa-retweet" aria-hidden="true"></i></a>
          <a href ="#""><i class="fa fa-heart" aria-hidden="true"></i></a>
        </div>
      </footer>
    </article>`;

  return $tweet;
}


// Render the tweets using createTweetElement function and the data array

function renderTweets(tweets) {
  // loops through tweets
  for (let i = tweets.length -1; i >=0; i--) {
    let $tweet = createTweetElement(tweets[i]);
    $("#tweet-container").append($tweet);
  }
}


// DOM loaded JS ------------------------------------------------------------------------


$(document).ready(function() {


  // Load the tweets

  loadTweets();


  // Animated icons for hover over tweet

  $("#tweet-container").on("mouseover", "article", function(event) {
    $(this).find(".fa").show(200);
  })
  .on("mouseleave", "article", function() {
    $(this).find(".fa").hide(200);
  });



  // Prevent the default submit of the new tweet form and post to "/tweets/"


  $("#tweet-submit").submit(function(event) {
    event.preventDefault();

    if (parseInt($(".counter").text()) < 0) {
      $(".warning").empty();
      $(".warning").text("You have too many characters!");
      return;
    }

    if (parseInt($(".counter").text()) === 140) {
      $(".warning").empty();
      $(".warning").text("Please enter a tweet.");
      return;
    }

    $(".warning").empty();
    submitTweet($(event.target).serialize());
    $(event.target).find("textarea").val("");
    $(".counter").text("140");
  });


  // Hides and shows the compose tweet form

  $(".new-tweet").hide();

  $(".header-compose-button").on("click", function(event) {
    $(".new-tweet").slideToggle();
    $("#tweet-submit").find("textarea").focus();
  });


});