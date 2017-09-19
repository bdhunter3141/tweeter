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



  // Fake data taken from tweets.json

  var data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];


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

    // let $tweet = $("<article>")
    //   .addClass("tweet");

    // Create the header
    // let $header = $("<header>")
    //   .addClass("tweet-header");
    // $header.append("<div>").addClass("avatar-div")
    //   .append($("<img>")
    //   .attr("src", tweetInfo.user.avatars.small)
    //   .attr("alt", "Avatar").addClass("tweet-avatar"));
    // $header.append($("<h1>")
    //   .text(tweetInfo.user.name));
    // $header.append($("<p>")
    //   .text(tweetInfo.user.handle)
    //   .addClass("header-handle"));
    // $tweet.append($header);

    // Create the body
    // let $body = $("<div>")
    //   .text(tweetInfo.content.text)
    //   .addClass("tweet-content");
    // $tweet.append($body);

    // Create the footer
    // let $footer = $("<footer>")
    //   .addClass("tweet-footer");
    // $footer.append($("<p>")
    //   .text(Math.floor((Date.now() - tweetInfo.created_at) / 86400000)  + " days ago"));
    // let $tweetIcons = $("<div>")
    //   .addClass("tweet-icons");
    // $tweetIcons.append($("<i>")
    //   .addClass("fa fa-flag")
    //   .attr("aria-hidden", "true"));
    // $tweetIcons.append($("<i>")
    //   .addClass("fa fa-retweet")
    //   .attr("aria-hidden", "true"));
    // $tweetIcons.append($("<i>")
    //   .addClass("fa fa-heart")
    //   .attr("aria-hidden", "true"));
    // $footer.append($tweetIcons);
    // $tweet.append($footer);
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


  renderTweets(data);



});