// Create web server
var express = require('express');
var app = express();

// Create the database
var Datastore = require('nedb');
var db = new Datastore({filename: 'comments.db', autoload: true});

// Create the web server
var server = app.listen(3000, function() {
  console.log('Server listening at http://localhost:3000');
});

// Serve the static files
app.use(express.static('public'));

// Create a route to post comments
app.get('/comment', function(request, response) {
  // Get the comment from the query string
  var comment = request.query.comment;

  // Save the comment to the database
  db.insert({ comment: comment }, function(err, newDoc) {
    if (err) {
      console.log('Error inserting comment into database');
    } else {
      console.log('Inserted new comment into database');
    }
  });

  // Send back a response
  response.send('Comment received');
});

// Create a route to get comments
app.get('/comments', function(request, response) {
  // Get all the comments from the database
  db.find({}, function(err, docs) {
    if (err) {
      console.log('Error getting comments from database');
    } else {
      // Send back a response
      response.send(docs);
    }
  });
});