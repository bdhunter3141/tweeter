"use strict";

const ObjectId = require('mongodb').ObjectID;

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {

  return {
    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet);
      callback(null, true);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      let database = db.collection("tweets").find().toArray((err, result) => {
        if (err) {throw err};
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        callback(null, result.sort(sortNewestFirst));
      });
    },

    // Updates the number of likes in the database
    updateLikes: function(tweet, clicks, callback) {
      db.collection("tweets").update({_id: ObjectId(tweet)}, {$inc: {likes: clicks}}, function(err, result) {
        callback(null, true);
      })
    }
  }
}