var User = require('mongoose').model('User'),
    Photo = require('mongoose').model('Photo'),
    Comment = require('mongoose').model('Comment'),
    Category = require('mongoose').model('Category'),
    passport = require("passport"),
    aws = require('aws-sdk');

function postComment(req, res) {
  var photoId = req.body.photo_id;
  var comment_object = req.body;
  var new_comment = new Comment(comment_object);
  new_comment.user_id = req.user._id;

  new_comment.save(function (err, comment) {
    if (err) res.render('photo/show', { message:
      req.flash('errorMessage') });
    res.redirect('/view-edit-photo/' + photoId);

  });
}

module.exports = {
  postComment: postComment
};
