var LocalStrategy = require( 'passport-local' ).Strategy
var User = require('../models/User')
	
module.exports = function( passport ) {
  // serialize user
  passport.serializeUser( function( user, done ) {
      done( null, user.id );
    } );
  // deserialize user
    passport.deserializeUser( function( id, done ) {
      User.findById( id, function( err, user ) {
        done( err, user );
      });
    });

  // local login strategy through passport
  passport.use( 'local-login', new LocalStrategy({
  	usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
	 }, function( req, email, password, callback ) {

    // Search for a user with this email
    User.findOne( { 'local.email' :  email }, function( err, user ) {
      if ( err ) return callback( err );

       // If no user is found
      if ( !user ) return callback( null, false, req.flash( 'loginMessage', 'No user found.' ) );

      // Wrong password
      if ( !user.validPassword( password ) ) {
            return callback( null, false, req.flash( 'loginMessage', 'Oops! Wrong password.' ) );
        }

      return callback( null, user );
    } )
  }))

  // local signup strategy through passport, signup controller will go through this
  passport.use( 'local-signup', new LocalStrategy( {
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
	}, function( req, email, password, callback ) {
  process.nextTick( function() {
    User.findOne({ 'local.email' :  email }, function( err, user ) {
      if ( err ) return callback( err );
      if ( user ) {
        return callback( null, false, req.flash( 'signupMessage', 'This email is already used.' ) );
      } else {
        var newUser = new User();
        newUser.local.email = email;
        newUser.local.password = newUser.encrypt( password );

        newUser.save( function( err ) {
          if ( err ) throw err;
          return callback( null, newUser );
        });
      }
    });
  });
}));
}