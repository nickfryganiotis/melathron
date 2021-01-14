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
    password: "root",
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

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

var auxs = {};
app.post("/send",(req, res) => {
    const customer = req.body
    const args = ['phone','mobile','continent_id','country_id','apotelesma_name','subapotelesma_name'];
    args.map(arg => {
    	if(customer[arg]){
    		auxs[arg] = customer[arg];
    		delete customer[arg];
    		arg;
    	}
    });
    

    console.log(customer); 
    
    var query =  "INSERT INTO customer SET ?";
    connection.query(query,customer,function(error,results){
        if (error) throw error;
        auxs['spcode'] = results.insertId;
        res.redirect('/auxs');
    });
        
 });

app.get('/auxs',(req,res) => {
	const spcode = auxs['spcode'];

	const phones =  auxs['phone'];
	if(phones){
		phones.map(phone => {
                const query = "INSERT INTO phone VALUES ("+spcode+","+phone['phone_number']+");";
                //console.log(query);
                //console.log(phone);
                connection.query(query, function (error) {
                    if (error) throw error;
                });
                phone;
            });
	}

    const mobiles = auxs['mobile'];

    if(mobiles){
    	mobiles.map(mobile => {
                const query = "INSERT INTO mobile VALUES ("+spcode+","+mobile['mobile_number']+");";
                //console.log(query);
                //console.log(phone);
                connection.query(query, function (error) {
                    if (error) throw error;
                });
                
                mobile;
            });       
    }

    const continent_id = auxs['continent_id'];
    const apotelesma_name = auxs['apotelesma_name'];
    const subapotelesma_name = auxs['subapotelesma_name'];
    console.log(continent_id,apotelesma_name,subapotelesma_name);
    if((apotelesma_name && subapotelesma_name) && continent_id){
    	const query = "INSERT INTO history_instance (spcode, apotelesma_id) VALUES (? , (SELECT apotelesma_id FROM apotelesma WHERE (apotelesma_name= ? AND subapotelesma_name= ? AND continent_id= ? )))";
    	connection.query(query,[spcode,apotelesma_name,subapotelesma_name,continent_id], function(error,results){
    		if (error) throw error;
    		console.log(results);
     });
    }
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
  
  app.post("/apotelesmata", (req, res) => {
    const area = req.body
    const query = "SELECT * FROM apotelesma WHERE continent_id = ?"
    connection.query(query, [area['continent_id']],function (error, results) {
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