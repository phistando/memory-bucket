var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = mongoose.model('User'),
    Photo = mongoose.model('Photo');

var CommentSchema = new Schema({
  comment_content:
  {
    type: String,
    trim: true
  },

  user_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  photo_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Photo'
  }]
});

CommentSchema.set('timestamps', {});
var Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
