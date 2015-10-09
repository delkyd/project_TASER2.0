var express = require( "express" );
var app = express();
// Parses information from POST
var bodyParser = require( "body-parser" );
// Used to manipulate POST methods
var methodOverride = require( "method-override" );
var passport = require( "passport" );
var usersController = require( "../controllers/users" );

function authenticatedUser( req, res, next ) {
  // If the user is authenticated, then we continue the execution
  if ( req.isAuthenticated() ) {
      return next();
  }
  // Otherwise the request is always redirected to the index page
  res.redirect( '/index' );
}
 
// lets GET to the home page! which is signup! 
app.get('/', function(req, res){
    res.render('signup')
})

// lets GET to the index page which should be the homepage but is now a seperate page called index
app.get('/index', function(req, res){
    res.render('index')
})

// lets GET to the flickr page!
app.get('/flickr', function(req, res){
    res.render('flickr')
})

//lets GET to the helpme page
app.get('/helpme', function(req, res){
    res.render('helpme')
})

//lets GET to the tasergear page
app.get('/tasergear', function(req, res){
    res.render('tasergear')
})

// lets GET the signup page and exceute the getSignup method from the controller
app.get("/signup", usersController.getSignup );
// lets POST the signup page and exceute the postSignup method from the controller
app.post("/signup", usersController.postSignup );

// lets GET the login page and exceute the getLogin method from the controller
app.get("/login", usersController.getLogin );
// lets POST the login page and exceute the postLogin method from the controller
app.post("/login", usersController.postLogin );

// lets GET the logout page and exceute nothing cause I didn't get this far...
app.get("/logout", usersController.getLogout );

// lets export this shiz
module.exports = app;
