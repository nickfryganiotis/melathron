# Back-end
We use express.js to develop the backend of our desktop application
## Express
***Import express***
```
const express = require('express');
//Init express
const app = express();
```
<br>

***Create endpoints***
<br>
We are accepting a get request to the index route, which is
is the slash, and we have a callback function that takes
a request and a respond
```
// Create your endpoints/route handlers
app.get('/',function(req,res){
  res.send('Hello World!');
});
```
<br>

We need a port 
```
//Listen to a port
app.listen(5000);
```
<br>
Within your route you can do just anything:<br>
 
1. fetch data from a database
2. load pages
3. return json data

<br>

***Request object***<br>
The request object represents the HTTP request properties for things like URL parameters, query strings
Any data that is sent within the body, the HTTP headers, all this stuff is included in the request
<br>
<br>
***Response object***<br>
The response object represents the HTTP response and it's up to you to sent json data, do you want to render a template
We can parse incoming data with the Body Parser

<br>
We don't have to put all of our routes in one file
Express has a router, so we can store routes in separate files and we can just export them
<br>
<br>

***Middleware functions***<br>
Middleware functions are functions that have access
to the request and response objects
We can write our own middleware functions
Middleware is capable of executing any code
making changes to the request and response objects ending the
response cycle.
Also you have to call the next middleware in the stack, so when you write a piece of middleware you will call a next function, so you can think of it as a stack of functions which executes whenever a request is made
to the server and you can do different things within those functions.

Make a package.json file using ```npm init -y```
Then ```npm i express```<br>

<br>
Create index.js<br>
Write some code for this<br>

```
const express = require('express');
const app = express();
const PORT = process.env.PORT|| 5000 // we want to look the environment variables 
```
One we deploy the server isn't going to run on 5000. It is going to have the port
number in an environment variable, so we want to check that first
<br>
<br>

```
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
```
We are gonna get this message here "Cannot GET /"
, "/" is the route for the index page. It can't find handler for this slash
If we try to go to like "/about/ we can't because we haven't created any routes<br>
We use

```
--app.get('/', (req,res) =>{
--  res.send('<h1>Hello world</h1>');
--});
```
or
```
app.get('/',(req,res) =>{
  res.sendFile(path.join(__dirname,'public','index.html'));
});
```
So we can load HTML files this way, but this is not ideal because we'd have to
a route manually for every single page, if we want an about page, a contact page etc,
we'd have to put separate routes.

We can also make a json variable members<br>
```
const members = [
   {
     ...
   },
     ...
   {
     ...
   }
];
app.get('/api/members', (req, res) => {
   res.json(members);
});
```
We can save the members variable in a js file Members and use the command
```module.exports = members;```
And on index.js write ```const members = require('./Members');```

<br>

***Middlewares***<br>
When you create a middlware you it takes in the the request, the response and the next. You always want to call the next last so you can move to the next middleware function, that is in the stack
```
const logger = (req,res,next) => {
  console.log('Hello');
  next();
}
 //Use(Init) the middleware
app.use(logger);
```
Every time i make a request this middleware will run. We have access to the
response and the request.
I can use ```console.log(`${req.protocol}`);```
I can install moment,using ```npm i moment ```, in order to take the date and import it using ```const moment = require('moment')```