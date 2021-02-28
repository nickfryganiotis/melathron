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

var auxs = {};  //send url
var params = {}; //send_sale url

app.post("/locations",(req, res) => {
    const country = req.body;
    const query = "SELECT * FROM location WHERE country_id = ? ";
    connection.query(query,country['country_id'],function(error,results){
        if (error) throw error;
        res.send(results);
    });
});

app.get("/professions",(req, res) => {
    const query = "SELECT * FROM profession;";
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

app.get("/salesman",(req, res) => {
    const query = "SELECT * FROM salesman;";
    connection.query(query, function (error, results) {
      if (error) throw error;
      res.send(results);
    });
});

app.post("/subscriptions",(req, res) => {
    const country = req.body;
    const query = "SELECT * FROM subscription WHERE country_id = ? ";
    connection.query(query,country['country_id'],function(error,results){
        if (error) throw error;
        res.send(results);
    });
});

app.get("/shipping_methods",(req, res) => {
    const query = "SELECT * FROM shipping_method;";
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

app.post("/send",(req,res) => {
    var customer = req.body
    const args = ['phone','mobile','continent_id','apotelesma_name','subapotelesma_name','salesman_name','category','profession','country_id','state','city','area'];
    args.map(arg => {
        if(customer[arg]){
            auxs[arg] = customer[arg];
            delete customer[arg];
            arg;
        }
    });
    console.log(customer);
    var input = [customer];
    var query = "INSERT into customer SET ?"; 
    if(auxs['category'] && auxs['profession']){
        query += ", `job_id` = (SELECT job_id FROM job WHERE category = ? and profession = ?)"
        input.push(auxs['category']);
        input.push(auxs['profession']); 
    }
    if(auxs['country_id'] && auxs ['state'] && auxs['city'] && auxs['area']){
        query += ", `location_id` = (SELECT location_id FROM location WHERE country_id = ? and state = ? and city = ? and area = ?)"
        input.push(auxs['country_id']);
        input.push(auxs['state']);
        input.push(auxs['city']);
        input.push(auxs['area']);        
    }
    connection.query(query, input,function (error, results) {
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

    const salesman_name = auxs['salesman_name'];
    if(salesman_name){
        const query = "INSERT INTO works_on VALUES (?, (SELECT salesman_id FROM salesman WHERE salesman_name = ?))"
        connection.query(query,[spcode,salesman_name],function(error){
            if (error) throw error;
        });
    }
    const apotelesma_name = auxs['apotelesma_name'];
    const subapotelesma_name = auxs['subapotelesma_name'];
    if(apotelesma_name && subapotelesma_name){
        const query = "INSERT INTO history_instance  VALUES (?,?,?)";
        connection.query(query,[spcode,apotelesma_name,subapotelesma_name], function(error,results){
            if (error) throw error;
            console.log(results);
     });
    }
    res.sendStatus(200);
});


app.post("/send_sale",(req,res)=>{
    var payment = req.body;
    const status = payment['status'];
    args = ['status','salesman_name','shipping_method_name','subscription_category','subscription_name',
    'payment_amount1','payment_method1','dose_deadline1','dose_amount1','payment_amount2','payment_method2','dose_deadline2','dose_amount2',
    'payment_amount3','payment_method3','dose_deadline3','dose_amount3','continent_id','country_id','number_of_doses'];
    args.map(arg => {
        if(payment[arg]){
            params[arg] = payment[arg];
            delete payment[arg];
            arg;
        }
    });
    var input = [payment];
    var query = "INSERT INTO sale SET ?"
    if(params['shipping_method_name']){
        query+= ", `shipping_method_id` = (SELECT shipping_method_id FROM shipping_method WHERE shipping_method_name = ?)";
        input.push(params['shipping_method_name']);
    }
    if(params['subscription_category'] && params['subscription_name'] && params['country_id']){
        query+=", `subscription_id`= (SELECT subscription_id FROM subscription WHERE subscription_category = ? AND subscription_name = ? AND country_id = ?)"
        input.push(params['subscription_category']);
        input.push(params['subscription_name']);
        input.push(params['country_id']);
    }
    if(params['salesman_name']){
        query+=", `salesman_id` = (SELECT salesman_id FROM salesman WHERE salesman_name = ?)";
        input.push(params['salesman_name']);
    }

    if(status === 1){
        query+="`number_of_doses` = ?";
        input.push(1);
        connection.query(query,input,function(error,results){
            if (error) throw error;
            params['sale_id'] = results.insertId;
            params['total_amount'] = payment['total_amount'];
            res.redirect('/status1');
        });
    }
    else{
        connection.query(query,input,function(error,results){
            if (error) throw error;
            params['sale_id'] = results.insertId;
            res.redirect("/status2");
        });
    }
});

app.get("/status1",(req,res) =>{
    vals = [];
    vals['dose_number'] = 1;
    vals['sale_id'] = params['sale_id'];
    if(params['total_amount']) vals['total_amount'] = params['total_amount'];
    if(params['payment_amount1']) vals['payment_amount1'] = params['payment_amount1'];
    if(params['payment_method1']) vals['payment_method1'] = params['payment_method1'];
    if(params['dose_deadline1']) vals['dose_deadline1'] = params['dose_deadline1'];
    const query = "INSERT INTO payment_info SET ?";
    connection.query(query,vals,function(error){
        if (error) throw error;
    })
    res.sendStatus(200);
});

app.get("/status2",(req,res)=>{
    vals = [[],[],[]];
    const number_of_doses = params['number_of_doses'];
    if(number_of_doses >= 1){
        vals[0]['dose_number'] = 1;
        vals[0]['sale_id'] = params['sale_id'];
        if(params['dose_amount1']) vals[0]['dose_amount1'] = params['dose_amount1'];
        if(params['payment_amount1']) vals[0]['payment_amount1'] = params['payment_amount1'];
        if(params['payment_method1']) vals[0]['payment_method1'] = params['payment_method1'];
        if(params['dose_deadline1']) vals[0]['dose_deadline1'] = params['dose_deadline1'];
        const query = "INSERT INTO payment_info SET ?";
        connection.query(query,vals[0],function(error){
            if (error) throw error;
        });
    }

    if(number_of_doses >= 2){
        vals[1]['dose_number'] = 2;
        vals[1]['sale_id'] = params['sale_id'];
        if(params['dose_amount2']) vals[1]['dose_amount2'] = params['dose_amount2'];
        if(params['payment_amount2']) vals[1]['payment_amount2'] = params['payment_amount2'];
        if(params['payment_method2']) vals[1]['payment_method2'] = params['payment_method2'];
        if(params['dose_deadline2']) vals[1]['dose_deadline2'] = params['dose_deadline2'];
        connection.query(query,vals[1],function(error){
            if (error) throw error;
        });
    }

    if(number_of_doses >= 3){
        vals[2]['dose_number'] = 3;
        vals[2]['sale_id'] = params['sale_id'];
        if(params['dose_amount3']) vals[2]['dose_amount3'] = params['dose_amount3'];
        if(params['payment_amount3']) vals[2]['payment_amount3'] = params['payment_amount3'];
        if(params['payment_method3']) vals[2]['payment_method3'] = params['payment_method3'];
        if(params['dose_deadline3']) vals[2]['dose_deadline3'] = params['dose_deadline3'];
        connection.query(query,vals[2],function(error){
            if (error) throw error;
        });
    }
    res.sendStatus(200);
});