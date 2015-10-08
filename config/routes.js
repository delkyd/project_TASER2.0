var
  express = require( "express" ),
  app = express(),
  // Parses information from POST
  bodyParser = require( "body-parser" ),
  // Used to manipulate POST methods
  methodOverride = require( "method-override" ),
  passport = require( "passport" ),
  usersController = require( "../controllers/users" ),
  staticsController = require( "../controllers/statics" );

function authenticatedUser( req, res, next ) {
  // If the user is authenticated, then we continue the execution
  if ( req.isAuthenticated() ) {
      return next();
  }

  // Otherwise the request is always redirected to the home page
  res.redirect( '/index' );
}

app.get('/', function(req, res){
    res.render('signup')
})

app.get('/index', function(req, res){
    res.render('index')
})

app.get('/flickr', function(req, res){
    res.render('flickr')
})

app.get('/helpme', function(req, res){
    res.render('helpme')
})

app.get('/tasergear', function(req, res){
    res.render('tasergear')
})


app.get("/signup", usersController.getSignup );
app.post("/signup", usersController.postSignup );

app.get("/login", usersController.getLogin );
app.post("/login", usersController.postLogin );

app.get("/logout", usersController.getLogout );

module.exports = app;
