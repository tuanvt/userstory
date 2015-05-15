var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CategorySchema = new Schema ({
	creator : { type: Schema.Types.ObjectId, ref : 'User'},
	title: String,
	colour: String, 
	created : { type: Date, default: Date.Now}
});

module.exports = mongoose.model('Category', CategorySchema);
