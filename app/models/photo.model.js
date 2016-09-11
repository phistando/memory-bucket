var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = mongoose.model('User'),
    Category = mongoose.model('Category');

    var PhotoSchema = new Schema({
      photo_url:
      {
        type: String
      },

      caption:
      {
        type: String
      },

      view_option:
      {
        type: Boolean, default: false
      },

      user_id:
      [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }],

      category_id:
      [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
      }]
  });

PhotoSchema.set('timestamps', {});
var Photo = mongoose.model('Photo', PhotoSchema);
module.exports = Photo;
