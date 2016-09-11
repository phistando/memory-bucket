var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema ({
  category_type: {
    type: String,
    enum: ['General', 'Nature', 'Travel', 'Food', 'People', 'Event'],
    default: 'General'
  }
});

CategorySchema.set('timestamps', {});
var Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
