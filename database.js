
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema ({
	name: String,
	type: String
});

var Item = mongoose.model('items', itemSchema);

mongoose.connect('mongodb://localhost/mongo-crud');

module.exports = Item;
