var express = require('express');
var router = express.Router();
var Item = require('../database.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST a new item */ 
router.post('/items', function(req, res, next) {
	var newItem = new Item({name: req.body.name, type: req.body.type});
	newItem.save(function(err, data){
		if (err) {
			res.json(err);
		}
		else {
			res.json(data);
		}
	});
});


/* GET all items */
router.get('/items', function(req, res, next) {
	Item.find({}, function(err, data){
		if (err) {
			res.json(err);
		}
		else if (data.length===0) {
			res.json({message: 'There are no items in the database.'});
		}
		else {
			res.json(data);
		}
	});
});

/* GET one item */
router.get('/items/:id', function(req, res, next) {
	Item.find({_id: req.params.id}, function(err, data){
		if (err) {
			res.json(err.message);
		}
		else if (data.length===0) {
			res.json({message: 'An item with that id does not exist in this database.'});
		}
		else {
			res.json(data);
		}
	});
});

/* UPDATE one item */
router.put('/items/:id', function(req, res, next) {
	var id = {_id: req.params.id};
	var update = {name: req.body.name, type: req.body.type};
	var options = {new: true};

	Item.findOneAndUpdate(id, update, options, function(err, data){
		if (err) {
			res.json(err.message);
		}
		else {
			res.json(data);
		}
	});
});


/* DELETE one item */
router.delete('/items/:id', function(req, res, next) {
	Item.findOneAndRemove({_id: req.params.id}, function(err, data){
		if (err) {
			res.json(err.message);
		}
		else if (data.length===0) {
			res.json({message: 'An item with that id does not exist in this database.'});
		}
		else {
			res.json({message: 'Success. Item deleted.'});
		}
	});
});


module.exports = router;
