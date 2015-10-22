
var mongoose = require('mongoose');
var Schema = mogoose.Schema;

var itemSchema = new Schema ({
	name: String,
	type: String
});

var Item = mongoose.model('items', itemSchema);

module.exports = Item;
