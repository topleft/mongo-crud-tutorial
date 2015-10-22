### Express Generator

`npm install -g express generator`

### Initital Project Structure 

>branch first-generator


├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.jade
    ├── index.jade
    └── layout.jade

### Refactor with Swig

> branch second-swig

Remove jade templating and use swig instead.

Add this to your package.json
`"swig": "^1.4.2"`
Run npm install

In app.js remove:

``` javascript
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
```


In app.js add:

```	javascript
var swig = require('swig')

var swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
```

In the views folder remove the all files and add a 
		layout.html
		index.html

Cut and paste this code into the layout.html:

``` html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>{{ title }}</title>
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/main.css">
  </head>
  <body>
    {% block content %}
    {% endblock %}
    <script type="text/javascript" src="//code.jquery.com/jquery-2.1.4.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="/js/main.js"></script>
  </body>
</html>

```

Cut and paste this into you index.html:

```
{% extends 'layout.html' %}

{% block title %}{% endblock %}


{% block content %}

  <div class="container">

    <h1>{{ title }}</h1>
    <p>Welcome to {{ title }}</p>

  </div>

{% endblock %}

```

Now in the terminal, in the root of the project directory run: 
'npm start' 

If everything is setup correctly you should see this:

** img of express page

### Set Up MongoDB with Mongoose

> branch third-mongodb

Start by installing Mongo and Mongoose:

`npm install mongodb -g`

`npm install mongoose --save`

Have a look at the package.json file. We now have mongoose in our dependencies.

Lets look at the MongoDB through our terminal.
In the command line type `sudo mongod`, then  enter you password. This will start the MongoDB daemon running. Now open a new tab and type `mongo`. This is the command line interface for mongoDB. Enter the command `show dbs`. This will show any databases that you have created. If you are using mongo for the first time it should be !?!?!?!?!.


Next add a new file, 'database.js' to the root directory.

In database.js add the following code:

```
// bring in mongoose and grab Schema constructor
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create new Schema, setting keys and value types
var itemSchema = new Schema ({
	name: String,
	type: String
});

// create a model, which is a Mongo collection, which is akin to a SQL table
var Item = mongoose.model('items', itemSchema);

// set up the connection to the local database, if it doesn't exist yet one will be created automatically
mongoose.connect('mongodb://localhost/mongo-item');

// make the Item Schema available to other files
module.exports = Item;


```
Possible schema field value types:

* String
* Number
* Date
* Buffer
* Boolean
* Mixed
* Objectid
* Array

http://mongoosejs.com/docs/schematypes.html


talk about ObjectId at some point

### CRUD Routes

In index.js we need to require our database file to get access to the Schema.

``` javascript
var Item = require('../database.js');
```

Lets create our first route. We need to be able to get all of our Items from the database. 

```

```












