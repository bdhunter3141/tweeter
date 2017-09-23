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


// Converts date info into "days ago", "hours ago", "minutes ago", or "more than a year ago"

function convertDate(dateNow, dateCreated) {
  let timeAmount = dateNow - dateCreated;

  // Less than a minute
  if (timeAmount < 60000) {
    return "Less than a minute ago";

  // One minute or minutes up to an hour
  } else if (timeAmount < 3600000) {
    let minutes = Math.floor(timeAmount / 60000);
    if (minutes === 1) {
      return "One minute ago";
    } else {
      return minutes + " minutes ago";
    }

  // One hour or hours up to a day
  } else if (timeAmount < 86400000) {
    let hours = Math.floor(timeAmount / 3600000);
    if (hours === 1) {
      return "One hour ago";
    } else {
      return hours + " hours ago";
    }

  // One day or days up to a year
  } else if (timeAmount < 31556952000) {
    let days = Math.floor(timeAmount / 86400000);
    if (days === 1) {
      return "One day ago";
    } else {
      return days + " days ago";
    }

  // Over a year
  } else {
    return "Over a year ago";
  }
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
        <p>${convertDate(Date.now(), tweetInfo.created_at)}</p>
        <div class="tweet-icons">
          <a href ="#""><i class="fa fa-flag" aria-hidden="true"></i></a>
          <a href ="#""><i class="fa fa-retweet" aria-hidden="true"></i></a>
          <form action ="#?_method=PUT" class="tweet-form" method="POST" data-id="${tweetInfo._id}">
            <button class="likeIcon" type="submit"><a href="#"><i class="fa fa-heart" aria-hidden="true"></a></i></button>
          </form>
          <p class="likeCounter">(${tweetInfo.likes})</p>
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
    $(this).find(".fa, .likeCounter").show(200);
  })
  .on("mouseleave", "article", function() {
    $(this).find(".fa, .likeCounter").hide(200);
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


  // Updates the likes button

let counter = -1;

  $("#tweet-container").on("submit", ".tweet-form", function(event) {
      event.preventDefault();
      counter = counter === 1 ? -1 : 1;
      let tweetID = $(this).data("id");
      $.ajax(`/tweets/${tweetID}`, {method: "put", data: {alreadyClicked: counter}})
      .done(function(result) {
        loadTweets();
      })
      .fail(function(err) {
        throw err;
    });

  });

});