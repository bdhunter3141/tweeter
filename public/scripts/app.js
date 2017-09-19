/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Animated icons for hover over tweet

$(document).ready(function() {

  $("#tweet-container").on("mouseover", "article", function(event) {
    $(this).find(".fa").show(200);
  })
  .on("mouseleave", "article", function() {
    $(this).find(".fa").hide(200);
  });


  // Prevent the default submit of the new tweet form and post to "/tweets/"

  $("#tweet-submit").submit(function(event) {
    $.ajax({url: "/tweets/", dataType: "text", type: "post", data: $(this).serialize()});
    event.preventDefault();
  });


  // Loads the tweets from the "/tweets/" page

  let loadTweets = function() {
    $.get("/tweets/", function(data){
      renderTweets(data);
    })
  }();


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
            <i class="fa fa-flag" aria-hidden="true"></i>
            <i class="fa fa-retweet" aria-hidden="true"></i>
            <i class="fa fa-heart" aria-hidden="true"></i>
          </div>
        </footer>
      </article>`;

    return $tweet;
  }

  // Render the tweets using createTweetElement function and the data array

  function renderTweets(tweets) {
    // loops through tweets
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $("#tweet-container").append($tweet);
    }
  }

});