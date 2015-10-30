### Refactor with Swig

> branch: second-swig

A 'templating language' provides a syntax for making more dynamic HTML pages. [Jade](http://jade-lang.com/) is a very common 'templating language' used with the MEAN stack. I prefer using [swig](http://paularmstrong.github.io/swig/) instead, a personal choice. Let's convert this app from 'jade' to 'swig':

Add this to your *package.json* file:

```
'swig': '^1.4.2'
```

![swig dependency](./public/images/package.json-swig.png)

/mongo-talk/public/images/packagejson-swig.png

Run `npm install` to to install a 'package'. NPM knows to look for the *package.json* file, which was created for us in the express generator build. 

In *app.js* remove:

``` javascript
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
```

And replace with:

```javascript
var swig = require('swig')

var swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
```

This is the first look at the *app.js* file, the heart of our application. In here we set the basic behavior and make available the necessities needed to run the app. 

In the **views** folder remove the all files and add: *layout.html* and *index.html*

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

This the foundation of all of our HTML pages and we can include content from other HTML files using the 'swig' syntax.

Next, cut and paste this into *index.html*:

```html
{% extends 'layout.html' %}

{% block title %}{% endblock %}


{% block content %}

  <div class="container">

    <h1>{{ title }}</h1>
    <p>Welcome to {{ title }}</p>

  </div>

{% endblock %}
```

Look at the `{% extends 'layout.html' %}`. That is saying, "This code will be wrapped in the *layout.html* file". Don't be too concerned now with this, as our focus here is the server-side code of this CRUD app. Onward!

In the terminal, in the root of the project directory (`mongo-crud`), run: 

```sh
$ npm start
```

If everything is set up correctly you should see:

![express default page](./public/images/express-default-page.png)

Those were all modifications dealing with how our page renders html files. We are now going to setup our app's database, MongoDB along with the Mongoose framework.
