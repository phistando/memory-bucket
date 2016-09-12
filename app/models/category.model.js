var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema ({
  category_type: {
    type: String,
    enum: ['General', 'Places', 'Food', 'People', 'Events', 'Random'],
    default: 'General'
  }
});

CategorySchema.set('timestamps', {});
var Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
