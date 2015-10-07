var
  mongoose = require( "mongoose" ),
  bcrypt   = require( "bcrypt-nodejs" ),
  User = mongoose.Schema({
    local : {
      email     : String,
      password  : String,
    }
  });

User.methods.validPassword = function( password ) {
    return bcrypt.compareSync( password, this.local.password );
  };

User.methods.encrypt = function( password ) {
  return bcrypt.hashSync( password, bcrypt.genSaltSync( 8 ), null );
};

module.exports = mongoose.model( "User", User );
