var mongoose = require( "mongoose" );
var bcrypt   = require( "bcrypt-nodejs" );

// lets make a user model
var User = mongoose.Schema( {
  // lets incorporate the users into a local user
  local : {
    email     : String,
    password  : String,
  }
});

// creates a validPassword method for the users
User.methods.validPassword = function( password ) {
    return bcrypt.compareSync( password, this.local.password );
  };

// creates a password generator for the users
User.methods.encrypt = function( password ) {
  return bcrypt.hashSync( password, bcrypt.genSaltSync( 8 ), null );
};

// export all the things!
module.exports = mongoose.model( "User", User );
