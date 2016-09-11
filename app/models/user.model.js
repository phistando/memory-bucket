var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    // bcrypt = require('bcrypt');
    bcrypt   = require('bcrypt-nodejs');


var userSchema = new Schema ({

  username: {
    type: String
    // ,
    // trim: true,
    // required: [true, 'Please fill in your username']
  },

  email: {
    type: String
    // ,
    // unique: true,
    // required: [true, 'Email is required'],
    // match: [/.+\@.+\..+/, 'Email is invalid']
  },

  password: {
    type: String
    // ,
    // required: [true, 'Password is required'],
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
}

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

// userSchema.pre('save', function(next) {
//   var user = this;
//
//
//   // generate the bcrypt salt
//   bcrypt.genSalt(5, function(err, salt) {
//     if(err) return next(err);
//
//     // create the hash ==> plain password text + salt
//     bcrypt.hash(user.password, salt, function(err, hash) {
//         // Store hash in your password DB.
//
//         user.password = hash;
//         next();
//     });
//   });
// });

// userSchema.methods.auth = function(posted_password, callback) {
//
//   // comparing
//   // 1st arg = posted password from req.body
//   // 2nd arg = hashed password from the db
//   // 3rd arg = is the callback
//   bcrypt.compare( posted_password, this.password, function(err, is_match) {
//     callback(null, is_match);
//   });
// };

// userSchema.set('timestamps', {}); // default timestamps by default
var User = mongoose.model('User', userSchema);
module.exports = User;
