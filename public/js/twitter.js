var express = require( "express" )
var app = express()
var http  = require('http').Server(app);
var io = require('socket.io')(http);
var Twit = require('twit');

io.on('connect', function(socket) {
  console.log('attempt to logon')
  socket.on('updateTerm', function (searchTerm) {
    console.log('socket on updateterm', searchTerm);
    socket.emit('updatedTerm', searchTerm);

    // Start stream
    if (stream) {
      stream.stop();
    }

    stream = twitter.stream('statuses/filter', { track: searchTerm, language: 'en' });

    stream.on('tweet', function (tweet) {
      var data = {};
      data.name = tweet.user.name;
      data.screen_name = tweet.user.screen_name;
      data.text = tweet.text;
      data.user_profile_image = tweet.user.profile_image_url;
      socket.emit('tweets', data);
    });
  });
});	
