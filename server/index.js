"use strict";

// Basic express and mongodb setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const MongoClient   = require("mongodb").MongoClient;
const MONGODB_URI   = "mongodb://localhost:27017/tweeter";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


// MongoDB connect and pass database to other files

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  console.log(`Connected to MongoDB on: ${MONGODB_URI}`);

  // The `data-helpers` module provides an interface to the database of tweets.
  // This simple interface layer has a big benefit: we could switch out the
  // actual database it uses and see little to no changes elsewhere in the code
  // (hint hint).
  //
  // Because it exports a function that expects the `db` as a parameter, we can
  // require it and pass the `db` parameter immediately:
  const DataHelpers = require("./lib/data-helpers.js")(db);

  // The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
  // so it can define routes that use it to interact with the data layer.
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  // Mount the tweets routes at the "/tweets" path prefix:
  app.use("/tweets", tweetsRoutes);

});


// Closing the conncetion to mongo when the node process terminates

function gracefulShutdown() {
  console.log("\nShutting down gracefully...");
  try {
    db.close();
  }
  catch (err) {
    throw err;
  }
  finally {
    process.exit();
  }
}

// listen for TERM signal
process.on('SIGTERM', gracefulShutdown);
// listen for INT signal
process.on('SIGINT', gracefulShutdown);


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
