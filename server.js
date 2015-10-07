var express = require( "express" )
var app = express()
var mongoose = require( "mongoose" )
var passport = require( "passport" )
var flash = require( "connect-flash" )
var ejsLayouts = require( "express-ejs-layouts" )
var cookieParser = require( "cookie-parser" )
var bodyParser = require( "body-parser" )
var session = require( "express-session" )
var routes = require( "./config/routes")
var config = require( "./config/config" )
var http  = require('http').Server(app);
var io = require('socket.io')(http);
var Twit = require('twit');
var stream;
var DB = process.env.MONGOLAB_URI || 'mongodb://heroku_1mgn9dsf:9jv9c62p1e84nr5rdj4o7erlob@ds035683.mongolab.com:35683/heroku_1mgn9dsf';
var port = process.env.PORT || 3000;

//require('./public/js/twitter')

var twitter = new Twit({
  consumer_key: "Hmb1QSex600W2AjRDjtS5wKJs",
  consumer_secret: "qu5ZWCtgGFrmery8UzFKYXzMUDIMnLuINwh9MxImWot9eXQYWH",
  access_token: "168559143-h2AEJUIO1WQljPHkzXzlVQBIcAxWpwnI2zGYg7UU",
  access_token_secret: "G6t16z6I833qrCIOaZgsyJlOaQUOr6Clar5B0ShqN3d6h"
});

mongoose.connect( "mongodb://localhost/local-authentication-with-passport" ); 

app.use( cookieParser() );
app.use( bodyParser() ); 

app.set( "view engine", "ejs" );
app.use( ejsLayouts );
app.set( "views", "./views" );
app.use( express.static( __dirname + "/public" ) );
app.engine('ejs', require('ejs').renderFile);


app.use( session( { secret: "WDI-GENERAL-ASSEMBLY-EXPRESS" } ) ); 
app.use( passport.initialize() );
app.use( passport.session() ); 
app.use( flash() ); 


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




require( "./config/passport" )( passport );

app.use( function ( req, res, next ) {
    global.user = req.user;
    next()
  });

app.use( routes );

http.listen( config.port );
console.log( "Listening on port: ", config.port );
