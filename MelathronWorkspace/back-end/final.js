const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const session = require('express-session')
const { response } = require("express");
const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "CoronaVirus2020",
    database: "melathron",
});
app.disable('x-powered-by');

app.use(function(req, res, next) {
  
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(session({
	secret: 'secret',
	resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/send",(req, res) => {
    const customer = req.body
    console.log(customer); 
    
    var str1 = "INSERT INTO customer (";
    var str2 = " VALUES (";

    var keys = Object.keys(customer);
    var values = Object.values(customer);

    const value = values.map(el => stringify(el));
    str1 += foldl("",keys);
    str2 += foldl("",value);
    str2 += ";";
    var query = str1+str2;
   
    connection.query(query, function (error, results) {
        if (error) throw error;
        console.log("Query is done");
    });

    query = "SELECT LAST_INSERT_ID();";
    connection.query(query,function(error,results){
        if (error) throw error;
        else if (results.length>0){
            const spcode = results[0]['LAST_INSERT_ID()'];
            req.session.spcode = spcode;
            res.send({"spcode": spcode});
        }
        else{
            console.log("No insertion");
            res.sendStatus(404);
        }
        
    });
    
    //res.end();
    //res.sendStatus(200)
});

app.get("/locations", (req, res) => {
    const query = "SELECT * FROM location;";
    connection.query(query, function (error, results) {
      if (error) throw error;
      res.send(results);
    });
  });
  
  app.get("/professions", (req, res) => {
    const query = "SELECT * FROM job;";
    connection.query(query, function (error, results) {
      if (error) throw error;
      res.send(results);
    });
  });
  
  app.get("/apotelesmata", (req, res) => {
    const query = "SELECT * FROM apotelesma;";
    connection.query(query, function (error, results) {
      if (error) throw error;
      res.send(results);
    });
  });
  
  app.get("/salesman", (req, res) => {
    const query = "SELECT * FROM salesman;";
    connection.query(query, function (error, results) {
      if (error) throw error;
      res.send(results);
    });
  });
  
  app.get("/subscriptions", (req, res) => {
    const query = "SELECT * FROM subscription";
    connection.query(query, function (error, results) {
      if (error) throw error;
      res.send(results);
    });
  });
  
  app.get("/shipping_methods", (req, res) => {
    const query = "SELECT * FROM shipping_method";
    connection.query(query, function (error, results) {
      if (error) throw error;
      res.send(results);
    });
  });
  
  app.get("/customers", (req, res) => {
    const query = "SELECT * FROM customer";
    connection.query(query, function (error, results) {
      if (error) throw error;
      res.send(results);
    });
  });

  app.get("/continents", (req, res) => {
    const query = "SELECT * FROM continent";
    connection.query(query, function (error, results) {
      if (error) throw error;
      res.send(results);
    });
  });

  app.get("/countries", (req, res) => {
    const query = "SELECT * FROM country";
    connection.query(query, function (error, results) {
      if (error) throw error;
      res.send(results);
    });
  });

app.post('/Graham',function(req,res){
    const telephones = req.body
    const phones = telephones['phone'];
    const mobiles = telephones['mobile'];
    const spcode = telephones['spcode'];
    //console.log(phones);
    //console.log(mobiles);
    //console.log(spcode)
    phones.map(phone => {
                const query = "INSERT INTO phone VALUES ("+spcode+","+phone['phone_number']+");";
                //console.log(query);
                //console.log(phone);
                connection.query(query, function (error) {
                    if (error) throw error;
                });
                phone;
            });
            mobiles.map(mobile => {
                const query = "INSERT INTO mobile VALUES ("+spcode+","+mobile['mobile_number']+");";
                //console.log(query);
                //console.log(phone);
                connection.query(query, function (error) {
                    if (error) throw error;
                });
                
                mobile;
            });       

	
    res.sendStatus(200);
    
});

function foldl(init,l){
    return ((l.length==1) ? (init+l[0]+")") : foldl(init+l[0]+",",l.slice(1)));
}
function stringify(el){
    return ((typeof(el)==="string") ? ("'"+el+"'") : el);
}
