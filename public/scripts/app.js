/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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


  // Dynamically creates tweet HTML

  const createTweetElement = function(tweetInfo) {
    let $tweet = $("<article>")
      .addClass("tweet");
    let $header = $("<header>")
      .addClass("tweet-header");
    $header.append($("<img>")
      .attr("src", tweetInfo.user.avatars.small)
      .attr("alt", "Avatar").addClass("tweet-avatar"));
    $header.append($("<h3>")
      .text(tweetInfo.user.name));
    $header.append($("<p>")
      .text(tweetInfo.user.handle)
      .addClass("header-handle"));
    $tweet.append($header);
    let $body = $("<div>")
      .text(tweetInfo.content.text)
      .addClass("tweet-content");
    $tweet.append($body);
    let $footer = $("<footer>")
      .addClass("tweet-footer");
    $footer.append($("<p>")
      .text(tweetInfo.created_at));
    let $tweetIcons = $("<div>")
      .addClass("tweet-icons");
    $tweetIcons.append($("<i>")
      .addClass("fa fa-flag")
      .attr("aria-hidden", "true"));
    $tweetIcons.append($("<i>")
      .addClass("fa fa-retweet")
      .attr("aria-hidden", "true"));
    $tweetIcons.append($("<i>")
      .addClass("fa fa-heart")
      .attr("aria-hidden", "true"));
    $footer.append($tweetIcons);
    $tweet.append($footer);
    return $tweet;
  }


  function renderTweets(tweets) {
    // loops through tweets
    for (let tweet of tweets) {
      console.log(tweet)
      let $tweet = createTweetElement(tweet);
      $("#tweet-container").append($tweet);
    }
  }


  renderTweets(data);



});