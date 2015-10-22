var express = require('express');
var router = express.Router();
var Item = require('../database.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* post a new item */ 
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


// get items from database and respond with json
router.get('/items', function(req, res, next) {
	console.log('hello');
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


module.exports = router;
