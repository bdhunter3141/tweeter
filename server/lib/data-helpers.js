"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {

  return {
    // Saves a tweet to `db`
    saveTweet(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet);
      callback(null, true);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets(callback) {
      let dataArr;
      let database = db.collection("tweets").find().toArray((err, result) => {
        if (err) {throw err};
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        callback(null, result.sort(sortNewestFirst));
      });
    }
  };
}