var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema ({
  category_type: {
    type: String
  }
});

CategorySchema.set('timestamps', {});
var Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
