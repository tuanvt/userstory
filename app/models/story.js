var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CategorySchema = require('../models/category');

var StorySchema = new Schema ({
	creator : { type: Schema.Types.ObjectId, ref : 'User'},
	title: String,
	content : String,
	created : { type: Date, default: Date.Now} ,
	categories: [ CategorySchema]
});

module.exports = mongoose.model('Story', StorySchema);
