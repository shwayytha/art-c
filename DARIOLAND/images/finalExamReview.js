/*
Types of values in javascript

1. number
2. string
3. boolean
4. object
5. function
6. undefined

typeof 317.0
'number'

interesting number values
-------------------------
NaN
Infinity, -Infinity

And and Or
----------
|| will return left operands value if it is true, else returns value on the right
&& will return left operants value if its false, else returns value on the right

Inherent Truthiness
-------------------

0
NaN
""
undefined/null

^ all the above evaluate to false
*/

// Normal way to define function
var myFunction = function(x){
    return x;
}

// Hoisted function
function f(x){
    return x;
}

//Hoisting
//---------------------------
var num = 1000;
f();

function f(){
	console.log(num)
	var num = 5;
};

// output is below
// undefined

var inner = 1000;
function outer () {
    inner = 5;
    function inner() {}
}
outer();
console.log(inner);

// output is
/*
the output is 1000
the function declaration of inner is hoisted to the top of the enclosing scope
which renders the first line of the function, inner = 5, a reassignment of the local inner, not the global
*/

// DONT FORGET
// VARIABLES ASSIGNED TO NEAREST ENCLOSING scope

var x = 10;
function f() {
  function g() {
    x = 20;
  }
  g();
}
f();
console.log(x);

// OUTPUT IS
// 20

/*
Closure

function defined inside another function has access to outer functions stuff even after that outer function is done executing

Functions retain access to their original scope, even when the outer function they were defined in has returned.
*/

var gimmeFunction = function() {

	var a = "I'm in here!";

	return function() {
		console.log(a);
	}
}

var myFunction = gimmeFunction();
myFunction();

// ^ in above, a has access to outer a

// Arrays are objects, their indexes are just properties

/*
A higher order function is a function that takes
a function or functions as a paramater or returns
a function
*/


/*
To make a module, take the functions that you
write and add them to the exports object
*/

// functions have an arguments array, this holds all the arguments

/*
TODO LOOK OVER PROTOTYPES
http://foureyes.github.io/csci-ua.0480-spring2016-010/slides/07/objects-review.html#/
*/

// parts of the url
//scheme://domain:port/path?query#fragment_id
//http://pizzaforyou.com:80/search?type=vegan#top_result

/*
HTTP hyper text transfer protocal
----------------------------------
it is a request response protocal

request consists of

request line
request headers
empty line
optional body

Request methods

GET - retrieve data without effecting anything
data passed in query string which is part of the url
POST - requests that the server accept the data in the request for storage(creating data)
data passed in body

Response
a status line, which gives status
response header fields - Content-Type: text/html
an empty line
an optional message body, which is usually html

response statuses
100 Informational, request received
200 Success, everything worked
300 Redirection, additional action must be taken
400 Client Error, client fucked up
500 Server error, server fucked up
*/

// use curl to make request and see response, can be helpful for debugging

// package.json includes author, dependencies, devDependencies (needed to run)
// npm init to create package.json

/*
http versus express

urls arent handled well, express deals with that
for every request, u need to set all the headers
files read from disk, arent cached
lots of manual work

express makes using templating easier (hbs)
routing
middleware
database access
general project structure
*/


/*
req, res

req.url
req.headers
req.method
req.path
req.query
req.body

body parser is middleware
serving static is middleware

middleware
----------
app.use(function(req, res, next) {
	console.log('params for ', req.method, req.url);
	console.log('req.url:', req.url);
	next();
});

req.query for get params

<form method="POST" action="/">
    Enter your name: <input type="text" name="myName">
    Submit button: <input type="submit">
</form>
*/


/*
sessions
--------
cookies are text files stored by your browser in a database

Your broswer has a cookie tied to domain visited
it contains identifier
when your browser makes a request to the server, it sends along that identifier
the server finds the session asscoiated with that identifier
the session store can be in memory or file based or a database
you can store data for that users sessions in the data store


you can store data on per session basis by maintaining a small piece of data on the client(cookies)
this matches with data on the server
different clients will have different sessions

You need to set up session options
*/

var sessionOptions = {
	secret: 'secret for signing session id',
	saveUninitialized: false,
	resave: false
};
app.use(session(sessionOptions));

/*
session continued

secret - used to sign session id cookie, makes cookie hard to guess
saveUninitialized: false - dont save new empty session
resave: false - prevents session data from being resaved if session data is unmodified

req.session.videosWatched = req.body.videosWatched

res.send(req.session.videosWatched)
*/

app.get('/', function(req, res) {
	res.render('simple-form', {'myName':req.session.myName});
});

app.post('/', function(req, res) {
	console.log(req.body);
	req.session.myName = req.body.myName;
	res.redirect('/');
});

app.listen(3000);


/*
sessions are unique to each browser session
incognito windows will have new session

the above example stores sssion data in memory, if server restarts we lose it all

*/

/*
scaffolding
-----------

Express Generator is a command line tool that creates a skeleton express project

creates a simple express app with
- templating
- static file serving
- body parsing
- logging
- package.json
- directory structure
- 404 and 500 pages

to install
npm install -g express-generator

to start the project

express --hbs applicationName      < -- memorize this
cd applicationName
npm install

nodemon start or node bin/www to start app

Things are created, those things are

views
public
routes
bin
app.js
package.json

benifits of using routes
- applications get big, all routes in one file is complicated
- helps orgaize functionality by top level paths
- /blog/.....
- /accounts/.....

There is no layouts folder when using express generator,
just a layout.hbs

this hbs has less features than express-handlebars
but its fine for this class

defaults with 2 space indents FUCK THAT

*/

/*
MongoDB is document store, noSQL

Document Stores
    Good for semi structured data
    large volumes of data
    fluid data(data that will change)

A record in Mongo is a Document
A Document is a bunch of key value Pairs
A Collection is a group of documents

            Collection

Document Document Document Document

Data types
string
numbers
boolean
array
timestamp
objectid

Mongo shell commands
--------------------
use db
show db
show collections
db.dropDatabase()
db.dropCollection()

db.collection.insert
db.collection.find
db.collection.update
db.collection.remove

Mongoose is an ODM, which is an object document mapper
ODMs map objects in the application their counter parts in the database

Mongoose
--------
schema - analogous to a collection
model - the actual constructors that we use to create objects
object - a single document
*/

var mongoose = require('mongoose');
// define the data in our collection
var Cat = new mongoose.Schema({
	name: String,
	updated_at: Date
});

// "register" it so that mongoose knows about it
mongoose.model('Cat', Cat);
mongoose.connect('mongodb://localhost/catdb');

==============================
// in app.js
var mongoose = require('mongoose');
var Cat = mongoose.model('Cat');

router.post('/cat/create', function(req, res) {
	console.log(req.body.catName);
	new Cat({
		name: req.body.catName,
		updated_at : Date.now()
	}).save(function(err, cat, count){
		res.redirect('/cats');
	});
});


/*
Authentication
The process of determining whether someone is who they say they are

Authorization
set of rules that determine whether a user is allowed to perform an action they are
trying to perform

How to authenticate on the web

- traditionally u use username and password
- facebook or log in with google
- 2 factor auth

Password
-----------
- never store it as plain text
if hacker gets access to db, they can see the password
an admin can see the plain text password, which is not good
database backups can be stolen

Hashing and Encryption are different ways to transform string into another string

hashing - one way function (mapping)
encryption - is a two way function
    its reversible
    you can decrypt an encrypted string

for passwords, we should use hashing
because if the transformation were reversible, then it would be
possible to retrieve the actual passwords

good hashing function has collision resistance

to prevent the hash of two same passwords being the same, is by using a salt
add a random string to the password
the the string formed by adding the salt and the password

We use Passport to authenticate
passport - authentication middleware

*/


/*
Router

*/

//creating a router
var express = require('express');
var router = express.Router();


module.exports = router;
/*
express generator doesnt create db.js
*/

/*
for URLs, dont expose technical details
avoid meaningliess information
*/


/*
Server side validation

You can validate something in the database layer
Mongoose Schema

In the controller
Which is the express router, just do something if err

In mongoose, validation is defined in the schema type
Mongoose has built in validators
Numbers can have min max
types can be required

name: {type:String, required:true}
*/

/*
JavaScript on the client side

There are 3 ways
- external js file
- in between script files
- js as an elements attribute

The way you should do it is by
- using a external js file
    - encourages code reuse
    - allows caching of common code resources
    - helps separate content from style and functionality
benifits of not
    - simpler development
    - faster prototyping
    - reduce total number of requests made

Where should the javascript be included?
- Generally, you want it at the end of the body tage
    - This prevents the blocking of parsing the page
    - Means page can be rendered before the js needs to be loaded

How to make page load faster?
- Minimize external javascript file
- compress external JavaScript
- some script tags might have
    - asycn attribute
        Signals that the script doesnt have to block
    - defer attribute
        says the browser can download this after the page is parsed
*/


/*
DOM document object model

DOM is a tree
the root is documentElement
Two children are
body
head

document.documentElement
document.body
document.head

type of node is specified by constant

document.ELEMENT_NODE
document.TEXT_NODE

you can use nodeType property on element to see what time a node is
They also have

nodeName
nodeValue
    Most times nodeValue is null, unless its text, then its text

USEFUL PROPERTIES **
-----------
parentNode
childNodes
firstChild
lastChild
previousSibling
nextSibling
*/

function talksAbout(node, search) {
	if (node.nodeType === document.ELEMENT_NODE) {
		for (var i = 0; i < node.childNodes.length; i++) {
			if (talksAbout(node.childNodes[i], search)) {
				return true;
			}
		}
		return false
	} else if (node.nodeType === document.TEXT_NODE) {
		return node.nodeValue.indexOf(search) > -1 {
	}
}

/* ******* IMPORTANT SHIT

document.getElementById
document.getElementsByClassName
document.getElementsByTagName

node.removeChild()
node.appendChild()
node.insertBefore(nodeToInsert, beforeThisNode)
node.replaceChild(nodeToInsert, nodeToReplace)
node.textContent


document.createTextNode(text)
document.createElement(elementName)

you can access attributes easily

node.src = "some new url or whatever";

element.getAttribute(name)
element.setAttribute(name, value)
element.hasAttribute(name)
element.classList.toggle('someClassName')
document.querySelector('selector')  // selects one
document.querySelectorAll('selector')
*/

// remove all children
var myNode = document.getElementById("foo");
while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
}

/*
CSS

the display property determines how elements are laid out
p tags show up on different lines
achor tags show up on same line

every element has default display value
most of the time, default is inline or block

all possible values for display
----
block
    - start on new line, and stretch out horizontally as far as they can
    - they have height and width
    div, p h1
inline
    - stay on same line, do not have height and width
    you cant specify a width or height for them
    you can add padding and margins though
    span a em
none
    wont show up on page, as if element doesnt exist, use it to toggle stuff
    script style title, all have display none

inline-block
    - is an element that has a width and height, but flows with surrounding content inline
    - useful if you want elements on the same line that have an actual height and width
    - you might want to use it for a grid

    basically just like inline but you can specify height and width

you can center a block level element by specifying width and then setting margin-left and margin-right to auto


visibility property
visibility: none

^ will hide element but element still takes up space


position   IMPORTANT SHIT
--------
static
    not positioned
relative
    element with position relative can be positioned relative to where it normally would be placed
    attributes below start moving it around relative to where it would of been
    top bottom left right

    other elements flow as if the relative element next to it was in its normal place
fixed
    is positioned outside the normal flow, no space is left where the element would normally be
    its positioned relative to the screens viewport
    it stays in the same place even when its scrolled
    u can use top left bottom right
    width shrinks to fit content unless specified

    USE THIS FOR NAVBAR FIXED AT THE TOP

    header {
    	position: fixed;
    	top: 0;
    	left: 0;
    	height: 50px;
    	background-color: white;
    	width: 100%;
    	z-index: 1;
    }

    lets create sidebar thats right aligned IMPORTANT
    .sidebar {
	   position: absolute;
	   right: 0px;
	   width: 150px;
    }
absolute
    like fixed but relative to nearest positioned ancestor


you can access css properties with javascript
*/
var c = document.getElementById('content')
c.style.display = 'relative';
c.style.top = '150px';

/*
determining an elements width and height

border
margin
padding

box-sizing is ued to determine the width and height of an element
content-box is the default

content-box
---
width and height are calculated by the content only
does not include the padding border or margin
border comes between margin and padding


border-box
---
width and height include padding and border
does not include the margin though
not all browsers support completely yet

top left bottom right and z index dont effect static elements

Sizing
----
relative
    em
        default font size on most browsers is 16px
        dynamic sizing relative to fontsize
        1em, same size
        2em is twice as large as parents font size
    rem
        same as above but works with the font size of the root element, which is html

absolute
    px


Selectors  IMPORTANT SHIT

tagname#idvalue
tagname.classvalue
^this lets you be more specific

p.longparagraphs
means all the long paragraphs in

filter for attribute
[data-somedataatribute]{

}

multiple Selectors

h1, h3{
sfksafjllskdjf
}

A E … Any E element that is a descendant of an A element (that is: a child, or a child of a child, etc.)
A > E … Any E element that is a child of an A element
E:first-child … Any E element that is the first child of its parent
B + E … Any E element that is the next sibling of a B element (that is: the next child of the same parent)


pseudo classes

:hover
:link
:visited

:nth-child
matches the nth child of an elements parent
p:nth-child

you can pass it even or odd
p:nth-child(even)

nth-child(2n + 3)
every second child starting from 3

myelement.classList.add('baz');
myelement.classList.remove('foo');

*/


/*
Timers
there are three built in js functions that we can use for deferred actions
and or optionally repeated execution of functions

setTimeout
setInterval
window.requestAnimationFrame

*/

var pos = 0;
window.requestAnimationFrame(animate);
function animate() {
	console.log('I am being animated!')
	var c = document.getElementById('content')
	c.style.left = pos + 'px';
	pos += 1;
	window.requestAnimationFrame(animate);
}

/*
setInterval(Callback, interval)

calls callback repeatedly at specified interval

setTimeout(callback, delay)

calls callback once after delay

use request animation frame for its opimizations
*/


document.addEventListener('DOMContentLoaded', main);


// ajax request GET

var url = 'http://localhost:3000/hello.json';
var req = new XMLHttpRequest();
req.open('GET', url, true);


req.addEventListener('load', function() {
	if (req.status >= 200 && req.status < 400) {
		var messages = JSON.parse(req.responseText);
	}
});

req.addEventListener('error', function(e) {
	document.body.appendChild(document.createTextNode('uh-oh, something went wrong ' + e));
});

req.send();


//FOR POST
req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
req.send('name1=val1&name2=val2');


/*
SOP
Same origin policy
    policy implemented by browsers
    restricts how a document script or data from one origin can interact
    with a document from another origin

    it permits scripts running on pages originating from the same site to access documents from the same site
    prevents access to these resources if they are on different sites

    different port, protocal, and host not allowed

CORS
Cross origin resource sharing
    A mechanism that allows resources such as json and fonts to be requested from
    a domain different from origin

    browser pre flights request, sees if server allows cross origin requests for that url
    if yes, the request is made
*/

review everything below

server
------

io.on('connection', function(socket) {
	console.log(socket.id, 'has connected!');
    socket.on('disconnect', function() {
	       console.log(socket.id, 'good bye!');
    });

    socket.on('my awesome event', function(message) {
    	console.log(message);
    }

    socket.on('chat message', function(msg) {
    console.log('got message:' + msg);
        io.sockets.emit('chat message', msg);
    });

}
-------


client
------

<script src="/socket.io/socket.io.js"></script>
var socket = io();
var button = document.querySelector('input[type=button]');
console.log(button);
button.addEventListener('click', sendMessage);

function sendMessage(evt) {
	console.log('sending message', evt);
	socket.emit('chat message', document.querySelector('#message-input').value);
	document.querySelector('#message-input').value = '';
}

socket.on('chat message', onMessage);
function onMessage(msg) {
	document.querySelector('#messages').appendChild(document.createElement('li')).textContent = msg;
}


------

babel compiles jsx to javascript
webpack compiles on server



node.removeChild()
node.appendChild()
node.insertBefore(nodeToInsert, beforeThisNode)
node.replaceChild(nodeToInsert, nodeToReplace)
node.textContent


document.createTextNode(text)
document.createElement(elementName)

you can access attributes easily

node.src = "some new url or whatever";

element.getAttribute(name)
element.setAttribute(name, value)
element.hasAttribute(name)
element.classList.toggle('someClassName')
document.querySelector('selector')  // selects one
document.querySelectorAll('selector')


var c = document.getElementById('content')
c.style.display = 'relative';
c.style.top = '150px';

/
