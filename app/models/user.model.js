var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt   = require('bcrypt-nodejs');


var userSchema = new Schema ({

  username: {
    type: String
  },

  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required']
    // match: [/.+\@.+\..+/, 'Email is invalid']
  },

  password: {
    type: String,
    required: [true, 'Password is required']
    // validate: [
    //   function (password) {
    //     return password.length >= 6;
    //   },
    //   'Password is too short'
    // ]
  },
  admin: {
    type: Boolean,
    required: true,
    default: false
  }
});

userSchema.statics.encrypt = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};


var User = mongoose.model('User', userSchema);
module.exports = User;
