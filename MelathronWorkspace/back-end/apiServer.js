const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const session = require('express-session')
const passport = require('passport')
const { response, query } = require("express");
const app = express();
const LocalStrategy = require( 'passport-local' ).Strategy;
const e = require("express");



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

app.get("/categories",(req, res) => {
    const query = "SELECT * FROM category;";
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
    const query = "SELECT * FROM subscription WHERE country_id = ?";
    connection.query(query, [country['country_id']],function(error,results){
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
    const args = ['phone','mobile','continent_id','apotelesma_name','subapotelesma_name','salesman_name','category_name','profession_name','country_id','state','city','area'];
    args.map(arg => {
        if(customer[arg]){
            auxs[arg] = customer[arg];
            delete customer[arg];
            arg;
        }
    });
    //console.log(customer);
    var input = [customer];
    //console.log(input)
    var query = "INSERT into customer SET ?"; 
    if(auxs['category_name']){
        query += ", `category_id` = (SELECT category_id FROM category WHERE category_name = ?)"
        input.push(auxs['category_name']);
    }
    if(auxs['profession_name']){
        query += ", `profession_id` = (SELECT profession_id FROM profession WHERE profession_name = ?)"
        input.push(auxs['profession_name']); 
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
    const continent_id = auxs['continent_id']
    if(apotelesma_name && subapotelesma_name){
        const query = "INSERT INTO history_instance (spcode, apotelesma_id) VALUES (?, (SELECT apotelesma_id FROM apotelesma WHERE apotelesma_name = ? AND subapotelesma_name = ? AND continent_id = ?))";
        connection.query(query,[spcode,apotelesma_name,subapotelesma_name, continent_id], function(error,results){
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
    'payment_amount3','payment_method3','dose_deadline3','dose_amount3','payment_amount4','payment_method4','dose_deadline4','dose_amount4','continent_id','country_id','number_of_doses'];
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
        query+=", `subscription_id`= (SELECT subscription_id FROM subscription WHERE subscription_category = ? AND subscription_name = ? AND country_id = ?)";
        input.push(params['subscription_category']);
        input.push(params['subscription_name']);
        input.push(params['country_id']);
    }
    if(params['salesman_name']){
        query+=", `salesman_id` = (SELECT salesman_id FROM salesman WHERE salesman_name = ?)";
        input.push(params['salesman_name']);
    }

    if(status === 1){
        query+=", `number_of_doses` = ?";
        input.push(1);
        console.log(query)
        console.log(input)
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
    vals = {};
    vals['dose_number'] = 1;
    vals['sale_id'] = params['sale_id'];
    if(params['total_amount']) vals['dose_amount'] = params['total_amount'];
    if(params['payment_amount1']) vals['payment_amount'] = params['payment_amount1'];
    if(params['payment_method1']) vals['payment_method'] = params['payment_method1'];
    if(params['dose_deadline1']) vals['dose_deadline'] = params['dose_deadline1'];
    const query = "INSERT INTO payment_info SET ?";
    console.log(vals)
    console.log(query)
    connection.query(query,[vals],function(error){
        if (error) throw error;
    })
    res.sendStatus(200);
});

app.get("/status2",(req,res)=>{
    vals = [{},{},{},{}];
    const number_of_doses = params['number_of_doses'];
    if(number_of_doses >= 1){
        vals[0]['dose_number'] = 1;
        vals[0]['sale_id'] = params['sale_id'];
        if(params['dose_amount1']) vals[0]['dose_amount'] = params['dose_amount1'];
        if(params['payment_amount1']) vals[0]['payment_amount'] = params['payment_amount1'];
        if(params['payment_method1']) vals[0]['payment_method'] = params['payment_method1'];
        if(params['dose_deadline1']) vals[0]['dose_deadline'] = params['dose_deadline1'];
        const query = "INSERT INTO payment_info SET ? ";
        connection.query(query,vals[0],function(error){
            if (error) throw error;
        });
    }

    if(number_of_doses >= 2){
        vals[1]['dose_number'] = 2;
        vals[1]['sale_id'] = params['sale_id'];
        if(params['dose_amount2']) vals[1]['dose_amount'] = params['dose_amount2'];
        if(params['payment_amount2']) vals[1]['payment_amount'] = params['payment_amount2'];
        if(params['payment_method2']) vals[1]['payment_method'] = params['payment_method2'];
        if(params['dose_deadline2']) vals[1]['dose_deadline'] = params['dose_deadline2'];
        const query = "INSERT INTO payment_info SET ? ";
        connection.query(query,vals[1],function(error){
            if (error) throw error;
        });
    }

    if(number_of_doses >= 3){
        vals[2]['dose_number'] = 3;
        vals[2]['sale_id'] = params['sale_id'];
        if(params['dose_amount3']) vals[2]['dose_amount'] = params['dose_amount3'];
        if(params['payment_amount3']) vals[2]['payment_amount'] = params['payment_amount3'];
        if(params['payment_method3']) vals[2]['payment_method'] = params['payment_method3'];
        if(params['dose_deadline3']) vals[2]['dose_deadline'] = params['dose_deadline3'];
        const query = "INSERT INTO payment_info SET ? ";
        connection.query(query,vals[2],function(error){
            if (error) throw error;
        });
    }

    if(number_of_doses >= 4){
        vals[3]['dose_number'] = 4;
        vals[3]['sale_id'] = params['sale_id'];
        if(params['dose_amount4']) vals[3]['dose_amount'] = params['dose_amount4'];
        if(params['payment_amount4']) vals[3]['payment_amount'] = params['payment_amount4'];
        if(params['payment_method4']) vals[3]['payment_method'] = params['payment_method4'];
        if(params['dose_deadline4']) vals[3]['dose_deadline'] = params['dose_deadline4'];
        const query = "INSERT INTO payment_info SET ? ";
        connection.query(query,vals[3],function(error){
            if (error) throw error;
        });
    }
    res.sendStatus(200);
});

app.post("/search_customer",(req,res) => {

    const customer = req.body
    var input = [];
    var prefix_query = "SELECT cust.spcode, cust.last_name, cust.first_name, cust.company_name"; 
    
    var query = " SELECT *\n FROM customer\n";
    var parameters = false;
    if( customer[ 'last_name' ] ) {  query += !parameters ? " WHERE " : " AND ";  query += "last_name LIKE ?\n"; parameters = true; input.push( customer[ 'last_name' ] + '%' ); }
    if( customer[ 'first_name' ] ) {  query += !parameters ? " WHERE " : " AND ";  query += "first_name LIKE ?\n"; parameters = true; input.push( customer[ 'first_name' ] + '%'); }
    if( customer[ 'email' ] ) {  query += !parameters ? " WHERE " : " AND ";  query += "email LIKE ?\n"; parameters = true; input.push( customer[ 'email' ] + '%'); }
    if( customer[ 'website' ] ) {  query += !parameters ? " WHERE " : " AND ";  query += "website LIKE ?\n"; parameters = true; input.push( customer[ 'website' ] + '%'); }
    if( customer[ 'company_name' ] ) {  query += !parameters ? " WHERE " : " AND ";  query += "company_name LIKE ?\n"; parameters = true; input.push( customer[ 'company_name' ] + '%' ); }
    query += ") AS cust\n "; 
    
    parameters = false;
    if( customer[ 'country_id' ] || customer[ 'state' ] || customer [ 'city' ] || customer[ 'area' ] ) {
        query += "INNER JOIN (\n SELECT *\n FROM location\n"
        if( customer[ 'country_id' ] ) { query += !parameters ? " WHERE " : " AND "; query += "country_id = ?\n"; parameters = true; input.push( customer['country_id'] ); }
        if( customer[ 'state' ] ) { query += !parameters ? " WHERE " : " AND "; query += "("
                                    const states = customer['state'];
                                    for ( i=0; i< states.length; i++ ) { query += i > 0 ? " OR " : ""; query += "state = ?"; input.push(states[i]['value']);  }
                                    query += ")\n" }
        if( customer[ 'city' ] ) { query += !parameters ? " WHERE " : " AND "; query += "("
                                    const cities = customer['city'];
                                    for ( i=0; i< cities.length; i++ ) { query += i > 0 ? " OR " : ""; query += "city = ?"; input.push(cities[i]['value']);  }
                                    query += ")\n" }
        if( customer[ 'area' ] ) { query += !parameters ? " WHERE " : " AND "; query += "( "
                                    const areas = customer['area'];
                                    for ( i=0; i< areas.length; i++ ) { query += i > 0 ? " OR " : ""; query += "area = ?"; input.push(areas[i]['value']);  }
                                    query += ")\n" }
        query += ") AS loc ON cust.location_id = loc.location_id\n"
    }

    parameters = false;
    if ( customer[ 'category_name' ] ) {
        query += "INNER JOIN\n (SELECT *\n FROM category\n"
        if( customer[ 'category_name' ] ) { query += !parameters ? " WHERE " : " AND "; query += "("; parameters = true; 
                                       const categories = customer[ 'category_name' ];
                                       for ( i=0; i< categories.length; i++ ) { query += i > 0 ? " OR " : ""; query += "category_name = ?"; input.push(categories[i]['value']);  }
                                       query += ")\n"; }
        query += ") AS j ON j.category_id = cust.category_id\n";
        prefix_query += ", j.category_name";  
    }

    parameters = false;
    if ( customer[ 'profession_name' ] ) {
        query += "INNER JOIN\n (SELECT *\n FROM profession\n"
        if( customer[ 'profession_name' ] ) { query += !parameters ? " WHERE " : " AND "; query += "("; parameters = true; 
                                       const professions = customer[ 'profession_name' ];
                                       for ( i=0; i< professions.length; i++ ) { query += i > 0 ? " OR " : ""; query += "profession_name = ?"; input.push(professions[i]['value']);  }
                                       query += ")\n"; }
        query += ") AS j2 ON j2.profession_id = cust.profession_id\n";
        prefix_query += ", j2.profession_name";  
    }
    
    parameters = false;
    if ( customer[ 'apotelesma_name' ] || customer[ 'subapotelesma_name' ] ) {
        query += "INNER JOIN (\n SELECT *\n FROM apotelesma\n"
        if( customer[ 'apotelesma_name' ] ) { query += !parameters ? " WHERE " : " AND "; query += "("; parameters = true;
                                              const apotelesma_names = customer['apotelesma_name'];
                                              for ( i=0; i< apotelesma_names.length; i++ ) { query += i > 0 ? " OR " : ""; query += "apotelesma_name = ?"; input.push(apotelesma_names[i]['value']);  }
                                              query += ")\n"; 
                                              prefix_query +=  ", ap.apotelesma_name" }
        if( customer[ 'subapotelesma_name' ] ) { query += !parameters ? " WHERE " : " AND "; query += "("; parameters = true;
                                                 const subapotelesma_names = customer['subapotelesma_name'];
                                                 for ( i=0; i< subapotelesma_names.length; i++ ) { query += i > 0 ? " OR " : ""; query += "subapotelesma_name = ?"; input.push(subapotelesma_names[i]['value']);  }
                                                 query += ")\n"; 
                                                 prefix_query += ", ap.subapotelesma_name"  }
        query += ") AS ap ON cust.apotelesma_id = ap.apotelesma_id\n"
    }
    parameters = false;
    //query += "WHERE works_on.salesman_name = salesman.salesman_name\n";
    if ( customer['salesman_name'] ) { query += "INNER JOIN (\n SELECT salesman.salesman_name as salesman_name, works_on.spcode as spcode\n FROM works_on, salesman\n WHERE works_on.salesman_id = salesman.salesman_id\n";
                                       query += "AND ("
                                       const salesman_names = customer[ 'salesman_name' ];                                    
                                       for ( i=0; i< salesman_names.length; i++ ) { query += i > 0 ? " OR " : ""; query += "salesman.salesman_name = ?"; input.push(salesman_names[i]['value']);  }
                                       query += ")\n) AS wor ON cust.spcode = wor.spcode\n";
                                       prefix_query +=  ", wor.salesman_name" 
    }
                                
    parameters = false;
    if( customer[ 'subscription_category' ] || customer[ 'subscription_name' ]){
        query += "INNER JOIN (\n SELECT sale.spcode as spcode\n FROM sale, subscription s\n WHERE sale.subscription_id = s.subscription_id"; 
        if ( customer['subscription_category'] ) { query += "AND("
                                                   const subscription_categories = customer['subscription_category'];                                    
                                                   for ( i=0; i< subscription_categories.length; i++ ) { query += i > 0 ? " OR " : ""; query += "s.subscription_category = ?"; input.push(subscription_categories[i]['value']);  }
                                                   query += ")\n"; }
        if ( customer['subscription_name'] ) { query += "AND("
                                               const subscription_names = customer['subscription_name'];                                    
                                               for ( i=0; i< subscription_names.length; i++ ) { query += i > 0 ? " OR " : ""; query += "s.subscription_name = ?"; input.push(subscription_names[i]['value']);  }
                                               query += ")\n"; }
        query += ") AS sal ON cust.spcode = sal.spcode\n"
    }

    parameters = false;
    if ( customer[ 'phone_number ']) { query += "INNER JOIN (\n SELECT *\n FROM phone\n WHERE phone_number LIKE ?\n"; 
                                       input.push( customer['phone_number'] + '%' ); 
                                       quey += ") AS pho ON cust.spcode = pho.spcode\n" }
    
    if ( customer[ 'mobile_number ']) { query += "INNER JOIN (\n SELECT *\n FROM mobile\n WHERE mobile_number LIKE ?\n"; 
                                        input.push( customer['mobile_number'] + '%'); 
                                        query += ") AS mob ON cust.spcode = mob.spcode" }
    
    const fquery = prefix_query +"\nFROM ( \n" + query;
    connection.query( fquery, input, function ( error, results ) {
        if (error) throw error;
        res.send(results);   
    })
                    
});

app.post("/customer_info",(req,res) =>{
    const spcode = req.body['spcode'];
    var output = [];
    var query =  "SELECT * FROM customer c LEFT OUTER JOIN location l ON l.location_id = c.location_id LEFT OUTER JOIN apotelesma a ON a.apotelesma_id = c.apotelesma_id LEFT OUTER JOIN category cat ON cat.category_id = c.category_id LEFT OUTER JOIN profession pro ON pro.profession_id = c.profession_id WHERE c.spcode = ?"
    connection.query(query,spcode,function(error,results){
        if (error) throw error;
        output.push(results);
    });
    query =  "SELECT * FROM history_instance h, apotelesma a WHERE h.spcode = ? AND h.apotelesma_id = a.apotelesma_id";
    connection.query(query,spcode,function(error,results){
        if (error) throw error;
        output.push(results);       
    });
    query = "SELECT salesman.salesman_name, salesman.salesman_id FROM works_on LEFT OUTER JOIN salesman ON works_on.salesman_id = salesman.salesman_id WHERE works_on.spcode = ?"
    connection.query(query,spcode,function(error,results){
        if (error) throw error;
        output.push(results);        
    });
    query = "SELECT * FROM sale s, payment_info p, subscription sb, shipping_method sm WHERE s.spcode = ? AND p.sale_id = s.sale_id AND sb.subscription_id = s.subscription_id AND sm.shipping_method_id = s.shipping_method_id";
    query = "SELECT * FROM sale s LEFT OUTER JOIN payment_info p ON p.sale_id = s.sale_id LEFT OUTER JOIN subscription sb ON sb.subscription_id = s.subscription_id LEFT OUTER JOIN shipping_method sm ON sm.shipping_method_id = s.shipping_method_id WHERE s.spcode = ?";
    connection.query(query,spcode,function(error,results){
        if (error) throw error;
        output.push(results);
    });  

    query = "SELECT * FROM phone WHERE spcode = ?";
    connection.query( query , spcode , function( error,results) {
        if ( error ) throw error;
        output.push( results );
    } );

    query = "SELECT * FROM mobile WHERE spcode = ?";
    connection.query( query, spcode , function( error , results ) {
        if ( error ) throw error;
        output.push( results );
        res.send( output );
    } );
});


app.post( "/check_phones" , (req , res) => {
    
    const phones = req.body;
    console.log(req.body);
    var phone = new Set();
    for ( i = 0; i < phones.length; i++ ) {
        if (phones[i]['phones']){
        const phone_customer = phones[ i ][ 'phones' ].split(",").map( el => el.trim() );
        for ( j = 0; j < phone_customer.length; j++ ) phone.add( phone_customer[ j ] );
        }
    }

    var query = "SELECT * FROM phone";
    connection.query( query, function ( error, results ) {
        if (error) throw error;
        var found = false;
        for (i = 0; i < results.length; i++ ) { if ( phone.has( results[i][ 'phone_number' ] ) ) {found = true ;res.send( [{ 'spcode': results[ i ][ 'spcode' ]}] );}
        if (i==results.length-1 && !found) res.sendStatus(200) }
        //res.sendStatus(200);
    })
    
});

app.post( "/check_mobiles" , (req , res) => {
    
    const phones = req.body;
    console.log(req.body);
    var mobile = new Set();

    for ( i = 0; i < phones.length; i++ ) {
        if (phones[i]['mobiles']){
        const mobile_customer = phones[ i ][ 'mobiles' ].split(",").map( el => el.trim() );
        for ( j = 0; j < mobile_customer.length; j++ ) mobile.add( mobile_customer [ j ] );
        }
    }

    var query = "SELECT * FROM mobile";
    connection.query( query, function ( error, results ) {
        if (error) throw error;
        var found = false;
        for (i = 0; i < results.length; i++ ) { if ( mobile.has( results[i][ 'mobile_number' ] ) )  {found = true; res.send( [{ 'spcode': results[ i ][ 'spcode' ]}] );}
        if (i==results.length-1 && !found) res.sendStatus(200) }

        //res.sendStatus(200);
    })


    
});

function stringifyPhones(phones){
    var phone = [];
    const phone_customer = phones.split(",").map( el => el.trim() );
    for ( j = 0; j < phone_customer.length; j++ ) phone.push( phone_customer [ j ] );
    return phone
}

app.post("/customer_file",(req,res) => {
    
    const qery = `SELECT location_id FROM location\n  
                  WHERE (state = (SELECT state_name FROM STATE\n 
                  WHERE state_id = ?) and area = (SELECT area_name FROM AREA\n
                  WHERE area_id = ?) and city = (SELECT city_name FROM city\n
                  WHERE city_id = ?) and country_id = ?)`;
    let location_id;                
    let qery_input = [ req.body[ 'state_id'] , req.body[ 'area_id'] , req.body[ 'city_id'] , req.body[ 'country_id'] ];
    connection.query( qery , qery_input , function( error , result ) {
        if ( error ) throw error;
        location_id = result[ 0 ][ 'location_id' ];
    } );    
    var customer = req.body
    var auxs = {}
    const args = [ 'phone' , 'mobile' , 'apotelesma_id' , 'salesman_id' , 'country_id' , 'state_id' , 'city_id' , 'area_id' ];
    args.map(arg => {
        if(customer[arg]){
            auxs[arg] = customer[arg];
            delete customer[arg];
            arg;
        }
    });
    
    customer[ "location_id" ] = location_id;
    var input = [ customer ];
    var query = "INSERT into customer SET ?"; 
    connection.query(query, input,function (error, results) {
      if (error) throw error;
      //auxs['spcode'] = results.insertId;
      args.map(arg => {
        if(auxs[arg]){
            customer[arg] = auxs[arg];
            delete auxs[arg];
            //arg;
        }
    });
      var spcode = results.insertId;
      //res.redirect('/aux_customer_file');
      const phones = customer['phone'];
      if(phones){
        arrPhones = stringifyPhones(phones);
        arrPhones.map(phone => {
                const query = "INSERT INTO phone VALUES ("+spcode+","+phone+");";
                //console.log(query);
                //console.log(phone);
                connection.query(query, function (error) {
                    if (error) throw error;
                });
                phone;
            });
    }

    const mobiles = customer['mobile'];
    if(mobiles){
        arrMobiles = stringifyPhones(mobiles);
        arrMobiles.map(mobile => {
                const query = "INSERT INTO mobile VALUES ("+spcode+","+mobile+");";
                //console.log(query);
                //console.log(phone);
                connection.query(query, function (error) {
                    if (error) throw error;
                });
                
                mobile;
            });       
    }

    const salesman_id = customer['salesman_id'];
    console.log(salesman_id);
    if(salesman_id){
        const query = "INSERT INTO works_on VALUES ("+spcode+","+salesman_id+");";
        connection.query(query,function(error){
            if (error) throw error;
        });
    }
    const apotelesma_id = customer['apotelesma_id'];
    console.log(apotelesma_id);
    if(apotelesma_id){
        const query = "INSERT INTO history_instance (spcode, apotelesma_id) VALUES ("+spcode+","+apotelesma_id+");";
        connection.query(query, function(error,results){
            if (error) throw error;
            console.log(results);
     });
    }
    });
});

app.get('/aux_customer_file',(req,res) => {
    const spcode = auxs['spcode'];
    delete auxs['spcode'];
    const phones =  auxs['phone'];
    delete auxs['phone'];
    if(phones){
        arrPhones = stringifyPhones(phones);
        arrPhones.map(phone => {
                const query = "INSERT INTO phone VALUES ("+spcode+","+phone+");";
                //console.log(query);
                //console.log(phone);
                connection.query(query, function (error) {
                    if (error) throw error;
                });
                phone;
            });
    }

    const mobiles = auxs['mobile'];
    delete auxs['mobile'];
    if(mobiles){
        arrMobiles = stringifyPhones(mobiles);
        arrMobiles.map(mobile => {
                const query = "INSERT INTO mobile VALUES ("+spcode+","+mobile+");";
                //console.log(query);
                //console.log(phone);
                connection.query(query, function (error) {
                    if (error) throw error;
                });
                
                mobile;
            });       
    }

    const salesman_id = auxs['salesman_id'];
    delete auxs['salesman_id']
    console.log(salesman_id);
    if(salesman_id){
        const query = "INSERT INTO works_on VALUES ("+spcode+","+salesman_id+");";
        connection.query(query,function(error){
            if (error) throw error;
        });
    }
    const apotelesma_id = auxs['apotelesma_id'];
    delete auxs['apotelesma_id'];
    console.log(apotelesma_id);
    if(apotelesma_id){
        const query = "INSERT INTO history_instance (spcode, apotelesma_id) VALUES ("+spcode+","+apotelesma_id+");";
        connection.query(query, function(error,results){
            if (error) throw error;
            console.log(results);
     });
    }
    res.sendStatus(200);
});

app.post( '/sale_info', ( req, res ) =>{

    const sale_id = req.body[ 'sale_id' ];
    var output = [];
    var query = "SELECT * FROM sale LEFT OUTER JOIN salesman s ON s.salesman_id = sale.sale_id LEFT OUTER JOIN subscription sb ON sb.subscription_id = sale.subscription_id LEFT OUTER JOIN shipping_method sm ON sm.shipping_method_id = sale.shipping_method_id WHERE sale.sale_id = ?";
    connection.query( query, sale_id, function ( error, results) {
        if (error) throw error;
        output.push(results);
    })

    query = "SELECT * FROM payment_info WHERE payment_info.sale_id = ?";
    connection.query( query, sale_id, function ( error, results) {
        if (error) throw error;
        output.push(results);
        res.send(output);
    })


} )

app.post( '/search_sale', (req,res) => {

    const sale = req.body;
    var input = [];
    var parameters = false;
    var query = "SELECT sale.sale_id, sale.spcode, sm.salesman_name as salesman_name, cust.first_name, cust.last_name, cust.company_name, sb.subscription_category as subscription_category, sb.subscription_name as subscription_name, sale.voucher, sale.total_amount, sale.order_date, sale.paid\nFROM sale ";

    query += "INNER JOIN (\n SELECT * \n FROM salesman ";
    if ( sale[ 'salesman_name' ] ) { 
        query += "WHERE ";
        const salesman_names = sale[ 'salesman_name' ];
        for ( i = 0; i < salesman_names.length; i++ ) { query += i > 0 ? " OR " : ""; query += "salesman_name = ?"; input.push( salesman_names[i][ 'value' ] ); }

    }
    query += ")\n"; 
    query += " as sm ON sale.salesman_id = sm.salesman_id\n";

    query += "INNER JOIN (\n SELECT spcode, first_name, last_name, company_name FROM customer) as cust ON cust.spcode = sale.spcode "
    
    query += "INNER JOIN (\n SELECT *\n FROM subscription\n ";
    if( sale[ 'subscription_category' ] || sale[ 'subscription_name' ] ) {
         
        if ( sale[ 'subscription_category' ] ) { query += !parameters ? " WHERE " : " AND "; query += "("; parameters = true;
                                                 const subscription_categories = sale[ 'subscription_category' ];
                                                 for ( i=0; i < subscription_categories.length; i++ ) { query += i > 0 ? " OR " : ""; query += "subscription.subscription_category = ?"; input.push( subscription_categories[i]['value'] ); }
                                                 query += ")\n"; }
        if ( sale[ 'subscription_name' ] ) { query += !parameters ? " WHERE " : " AND "; query += "("; parameters = true;
                                                 const subscription_names = sale[ 'subscription_name' ];
                                                 for ( i=0; i < subscription_names.length; i++ ) { query += i > 0 ? " OR " : ""; query += "subscription.subscription_name = ?"; input.push( subscription_names[i]['value'] ); }
                                                 query += ")\n"; }
    }
    
    query += ") as sb ON sale.subscription_id = sb.subscription_id\n"

    if ( sale[ 'shipping_method' ] ) {
        query += "INNER JOIN (\n SELECT * \n FROM  shipping_method ";
        query +=  "WHERE ";
        const shipping_methods = sale[ 'shipping_method' ];
        for ( i = 0; i < shipping_methods.length; i++ ) { query += i > 0 ? " OR " : ""; query += "shipping_method_name = ?"; input.push( shipping_methods[i][ 'value' ] ); }
        query += ")\n"; 
        query += ") sh ON sale.shipping_method_id = sh.shipping_method_id\n";
    }

    parameters = false;
    if ( sale[ 'spcode' ]) { query += !parameters ? " WHERE " : " AND "; query += "sale.spcode = ?"; parameters = true; input.push( sale[ 'spcode' ] ); }
    if ( sale[ 'paid' ] && sale[ 'paid' ] !== 2 ) { query += !parameters ? " WHERE " : " AND "; query += "sale.paid = ?"; parameters = true; input.push( sale[ 'paid' ] ); }
    if ( sale[ 'amount1' ]) { query += !parameters ? " WHERE " : " AND "; query += "sale.total_amount >= ?"; parameters = true; input.push( sale[ 'amount1' ] ); }
    if ( sale[ 'amount2' ]) { query += !parameters ? " WHERE " : " AND "; query += "sale.total_amount <= ?"; parameters = true; input.push( sale[ 'amount2' ] ); }
    if ( sale[ 'order_date1' ]) { query += !parameters ? " WHERE " : " AND "; query += "date(sale.order_date) >= ?"; parameters = true; input.push( sale[ 'order_date1' ] ); }
    if ( sale[ 'order_date2' ]) { query += !parameters ? " WHERE " : " AND "; query += "date(sale.order_date) <= ?"; parameters = true; input.push( sale[ 'order_date2' ] ); }

    console.log(query);
    connection.query( query, input, function( error,results ) {
        if (error) throw error;
        res.send(results);
    } )


} );

app.post( '/delete_salesman', ( req,res ) => {
    
    const salesman = req.body;
    const query = "DELETE FROM works_on WHERE salesman_id = ? AND spcode = ?"
    connection.query( query, [ salesman['salesman_id'], salesman[ 'spcode' ] ] , function( error ) {
        if (error) throw error; 
        res.sendStatus(200);
    } );

} );

app.post( '/add_salesman', ( req, res ) => {

    const salesman = req.body;
    const query = "INSERT INTO works_on(salesman_id, spcode) VALUES (?,?) "
    connection.query( query, [ salesman['salesman_id'], salesman[ 'spcode' ] ] , function( error ) {
        if (error) throw error; 
        res.sendStatus(200);
    } );

} );

app.post( '/add_apotelesma', ( req, res ) => {

    const apotelesma = req.body;
    const query = "INSERT INTO history_instance (spcode, apotelesma_id) VALUES (? , (SELECT apotelesma_id FROM apotelesma WHERE apotelesma_name = ? AND subapotelesma_name = ? AND continent_id = ?));"
    connection.query( query, [apotelesma[ 'spcode' ] , apotelesma[ 'apotelesma_name' ], apotelesma[ 'subapotelesma_name' ], apotelesma[ 'continent_id' ]], function( error, results ) {
        if ( error ) throw error;
        res.sendStatus(200);
    });

} );

app.post( '/delete_apotelesma', ( req, res ) => {

    const apotelesma = req.body;
    const query = "DELETE FROM history_instance WHERE UNIX_TIMESTAMP(instance_date)*1000 = ? AND spcode = ? AND apotelesma_id = (SELECT apotelesma_id FROM apotelesma WHERE apotelesma_name = ? AND subapotelesma_name = ? AND continent_id = ?)"
    connection.query( query, [apotelesma['instance_date'], apotelesma[ 'spcode' ] , apotelesma[ 'apotelesma_name' ], apotelesma[ 'subapotelesma_name' ], apotelesma[ 'continent_id' ]], function( error, results ) {
        if ( error ) throw error;
        res.sendStatus(200);
    });
    
} );

app.post( '/update_apotelesma', ( req, res ) => { 
    
    const apotelesma = req.body;
    const query = "UPDATE history_instance SET apotelesma_id = (SELECT apotelesma_id FROM apotelesma WHERE apotelesma_name = ? AND subapotelesma_name = ? AND continent_id = ?) WHERE spcode = ? AND UNIX_TIMESTAMP(instance_date)*1000 = ?"
    connection.query( query , [ apotelesma[ 'apotelesma_name' ] , apotelesma[ 'subapotelesma_name' ] , apotelesma[ 'continent_id' ] , apotelesma[ 'spcode' ], apotelesma [ 'instance_date' ]] , function ( error ) {
        if (error) throw error;
        res.sendStatus( 200 );
    } )
    
} );


app.post ( '/update_customer', ( req,res ) => {

    const customer = req.body;
    var parameters = false;
    var query = "UPDATE customer SET ";
    var input = [];

    if ( customer[ 'state' ] || customer[ 'city' ] || customer[ 'area' ] ) {
        query += "location_id = (SELECT location_id FROM location "
        if ( customer[ 'state' ] ) { query += !parameters ? " WHERE " : " AND "; query += "state = ?"; parameters = true; input.push( customer[ 'state' ] ); delete customer[ 'state' ]; }
        if ( customer[ 'city' ] ) { query += !parameters ? " WHERE " : " AND "; query += "city = ?"; parameters = true; input.push( customer[ 'city' ] ); delete customer[ 'city' ]; }
        if ( customer[ 'area' ] ) { query += !parameters ? " WHERE " : " AND "; query += "area = ?"; parameters = true; input.push( customer[ 'area' ] ); delete customer[ 'area' ]; }
        if ( customer[ 'country_id' ] ) { query += !parameters ? " WHERE " : " AND "; query += "country_id = ?"; parameters = true; input.push( customer[ 'country_id' ] ); delete customer[ 'country_id' ]; }
        query += ") ";
    }

    for ( key in customer ) {
        if (key == 'spcode' || key == 'continent_id' || key == 'country_id') continue; 
        query += " " + key + "=?\n"; parameters = true; input.push( customer[ key ] );  
    }
    if ( customer['spcode'] ) { query += "WHERE spcode=?"; parameters = true; input.push( customer[ 'spcode' ]); }

    if ( parameters ) {
        connection.query( query, input, function( error) {
            if ( error ) throw error;
            res.sendStatus(200);
        } )
    }

} );


app.post( '/delete_phone' , ( req,res ) => {
    
    const customer = req.body;
    const query = "DELETE from phone WHERE spcode = ? AND phone_number = ?";
    connection.query( query , [ customer[ 'spcode' ] , customer[ 'phone_number' ] ] , function ( error ) {
        if ( error ) throw error;
        res.sendStatus( 200 );
    } );

}  );

app.post( '/delete_mobile' , ( req,res ) => {
    
    const customer = req.body;
    const query = "DELETE from mobile WHERE spcode = ? AND mobile_number = ?";
    connection.query( query , [ customer[ 'spcode' ] , customer[ 'mobile_number' ] ] , function ( error ) {
        if ( error ) throw error;
        res.sendStatus( 200 );
    } );

}  );

app.post( '/add_phone', ( req, res ) => {

    const customer = req.body;
    const query = "INSERT INTO phone (phone_number, spcode) VALUES (?,?) "
    connection.query( query, [ customer[ 'phone_number' ], customer[ 'spcode' ] ] , function( error ) {
        if (error) throw error; 
        res.sendStatus(200);
    } );

} );

app.post( '/add_mobile', ( req, res ) => {

    const customer = req.body;
    const query = "INSERT INTO mobile (mobile_number, spcode) VALUES (?,?) "
    connection.query( query, [ customer[ 'mobile_number' ], customer[ 'spcode' ] ] , function( error ) {
        if (error) throw error; 
        res.sendStatus(200);
    } );

} );

function stringifyParams( str ) {
    if (typeof str == "number") return str
    var arr = [];
    const arr_str = str.split(",").map( el => el.trim() );
    for ( j = 0; j < arr_str.length; j++ ) arr.push( arr_str [ j ] );
    return arr;
}

app.post('/sale_file' , ( req , res ) => {
    var payment = req.body;
    const number_of_doses = payment[ 'number_of_doses' ];
    args = [ 'payment_amount1' , 'payment_method1' , 'dose_deadline1' , 'dose_amount1' , 'payment_amount2' , 'payment_method2' , 'dose_deadline2' , 'dose_amount2' ,
    'payment_amount3' , 'payment_method3' , 'dose_deadline3' , 'dose_amount3' , 'payment_amount4' , 'payment_amount4', 'payment_method4' , 'dose_deadline4' , 'dose_amount4' , 'number_of_doses' ];
    
    if ( payment[ 'payment_amount' ] ) {
        const payment_amount = stringifyParams( payment[ 'payment_amount' ] );
        delete payment[ 'payment_amount' ];
        for ( i = 0; i < payment_amount.length; i++ ) payment[ 'payment_amount' + (i+1).toString() ] = payment_amount[ i ];
    }
    
    if ( payment[ 'payment_method' ] ) {
        const payment_method = stringifyParams( payment [ 'payment_method' ] );
        delete payment[ 'payment_method' ];
        for ( i = 0; i < payment_method.length; i++ ) payment[ 'payment_method' + (i+1).toString() ] = payment_method[ i ];
    }

    if ( payment[ 'dose_deadline' ] ) {
        const dose_deadline = stringifyParams( payment [ 'dose_deadline' ] );
        delete payment[ 'dose_deadline' ];
        for ( i = 0; i < dose_deadline.length; i++ ) payment[ 'dose_deadline' + (i+1).toString() ] = dose_deadline[ i ];
    }

    if ( payment[ 'dose_amount' ] ) {
        const dose_amount = stringifyParams( payment [ 'dose_amount' ] );
        delete payment[ 'dose_amount' ];
        for ( i = 0; i < dose_amount.length; i++ ) payment[ 'dose_amount' + (i+1).toString() ] = dose_amount[ i ];
    }
    

    var param = { };
    args.map(arg => {
        if( payment[ arg ] ) {
            param[ arg ] = payment[ arg ];
            delete payment[ arg ];
            arg;
        }
    });

    var input = [payment];
    var query = "INSERT INTO sale SET ?";

    query += ", `number_of_doses` = ?";
    input.push( number_of_doses );

    connection.query( query , input , function ( error , results ) {
        if ( error ) throw error;
        const sale_id = results.insertId;

        if ( number_of_doses == 1 ) {
            
            vals = {};
            vals[ 'dose_number' ] = 1;
            vals[ 'sale_id' ] = sale_id;
            
            if( payment[ 'total_amount' ] ) vals[ 'dose_amount' ] = payment[ 'total_amount' ];
            if( param[ 'payment_amount1' ] ) vals[ 'payment_amount' ] = param[ 'payment_amount1' ];
            if( param[ 'payment_method1' ] ) vals['payment_method'] = param[ 'payment_method1' ];
            if( param[ 'dose_deadline1' ] ) vals[ 'dose_deadline' ] = param[ 'dose_deadline1' ];
            const query = "INSERT INTO payment_info SET ?";
            connection.query( query , [ vals ] ,function( error ) {
                if ( error ) throw error;
                res.sendStatus( 200 );
            })           
        }
        
        else {
            vals = [{},{},{},{}];
            if( number_of_doses >= 1 ) {
                vals[ 0 ][ 'dose_number' ] = 1;
                vals[ 0 ][ 'sale_id' ] = sale_id;
                if( param[ 'dose_amount1' ] ) vals[ 0 ][ 'dose_amount' ] = param[ 'dose_amount1' ];
                if( param[ 'payment_amount1' ] ) vals[ 0 ][ 'payment_amount' ] = param[ 'payment_amount1' ];
                if( param[ 'payment_method1' ]) vals[ 0 ][ 'payment_method' ] = param[ 'payment_method1' ];
                if( param[ 'dose_deadline1' ]) vals[ 0 ][ 'dose_deadline' ] = param[ 'dose_deadline1' ];
                const query = "INSERT INTO payment_info SET ? ";
                connection.query( query , vals[ 0 ] ,function( error ) {
                    if ( error ) throw error;
                });
            }

            if( number_of_doses >= 2 ) {
                vals[ 1 ][ 'dose_number' ] = 2;
                vals[ 1 ][ 'sale_id' ] = sale_id;
                if( param[ 'dose_amount2' ] ) vals[ 1 ][ 'dose_amount' ] = param[ 'dose_amount2' ];
                if( param[ 'payment_amount2' ] ) vals[ 1 ][ 'payment_amount' ] = param[ 'payment_amount2' ];
                if( param[ 'payment_method2' ] ) vals[ 1 ][ 'payment_method' ] = param[ 'payment_method2' ];
                if( param[ 'dose_deadline2' ] ) vals[ 1 ][ 'dose_deadline' ] = param[ 'dose_deadline2' ];
                const query = "INSERT INTO payment_info SET ? ";
                connection.query( query , vals[ 1 ] , function( error ) {
                    if ( error ) throw error;
                });
            }

            if( number_of_doses >= 3 ) {
                vals[ 2 ][ 'dose_number' ] = 3;
                vals[ 2 ][ 'sale_id' ] = payment[ 'sale_id' ];
                if( param[ 'dose_amount3' ] ) vals[ 2 ][ 'dose_amount' ] = param[ 'dose_amount3' ];
                if( param[ 'payment_amount3' ] ) vals[ 2 ][ 'payment_amount' ] = param[ 'payment_amount3' ];
                if( param[ 'payment_method3' ] ) vals[ 2 ][ 'payment_method' ] = param[ 'payment_method3' ];
                if( param[ 'dose_deadline3' ] ) vals[ 2 ][ 'dose_deadline' ] = param[ 'dose_deadline3' ];
                const query = "INSERT INTO payment_info SET ? ";
                connection.query(query , vals[ 2 ] , function( error ) {
                    if ( error ) throw error;
                });
            }

            if( number_of_doses >= 4 ) {
                vals[ 3 ][ 'dose_number' ] = 4;
                vals[ 3 ][ 'sale_id' ] = sale_id;
                if( param[ 'dose_amount4' ] ) vals[ 3 ][ 'dose_amount' ] = param[ 'dose_amount4' ];
                if( param[ 'payment_amount4' ] ) vals[ 3 ][ 'payment_amount' ] = param[ 'payment_amount4' ];
                if( param[ 'payment_method4' ] ) vals[ 3 ][ 'payment_method' ] = param[ 'payment_method4' ];
                if( param[ 'dose_deadline4' ] ) vals[ 3 ][ 'dose_deadline' ] = param[ 'dose_deadline4' ];
                const query = "INSERT INTO payment_info SET ? ";
                connection.query( query , vals[ 3 ] , function( error ) {
                    if ( error ) throw error;
                    res.sendStatus( 200 );
                });
            }
    
        }
    } );     

} );

app.post("/update_sale" , ( req , res ) => { 
    
    const sale = req.body;
    var parameters = false;
    var query = "UPDATE sale SET ";
    var input = [];

    if( sale[ 'subscription_category' ] || sale[ 'subscription_name' ] ) {
        query += "subscription_id = (SELECT subscription_id FROM subscription ";
        if ( sale[ 'subscription_category' ] ) { query += !parameters ? " WHERE " : " AND "; query += "subscription_category = ?"; parameters = true; input.push( sale[ 'subscription_category' ] ); delete sale[ 'subscription_category' ]; }
        if ( sale[ 'subscription_name' ] ) { query += !parameters ? " WHERE " : " AND "; query += "subscription_name = ?"; parameters = true; input.push( sale[ 'subscription_name' ] ); delete sale[ 'subscription_name' ]; }
        if ( sale[ 'country_id' ] ) { query += !parameters ? " WHERE " : " AND "; query += "country_id = ?) "; parameters = true; input.push( sale[ 'country_id' ] ); delete sale[ 'country_id' ]; }
    }

    for ( key in sale ) {
        if ( key == 'continent_id' || key == 'country_id' || key == 'sale_id' ) continue; 
        query += " " + key + "=?\n"; parameters = true; input.push( sale[ key ] );  
    }
    if ( sale[ 'sale_id' ] ) { query += "WHERE sale_id=?"; parameters = true; input.push( sale[ 'sale_id' ]); }

    if ( parameters ) {
        connection.query( query, input, function( error ) {
            if ( error ) throw error;
            res.sendStatus(200);
        } )
    }

} );


app.post( "/mass_assignment" , function( req , res ) {

    const spcodes = req.body[ 'spcode' ];
    const sale_id = req.body[ 'salesman_id' ];

    let query = "";
    let input = [];
    for( let i = 0; i < spcodes.length; i++ ) {
        query += i === 0 ? "INSERT INTO works_on VALUES (? , ?)" : ", (? , ?)";
        input.push( spcodes[ i ] ) , input.push( sale_id );  
    }

    connection.query( query , input , function( error) {
        if ( error ) throw error;
        res.send( "Mass Assignment, completed successfully" );
    } )

} );

app.post( "/insert_dose" , function( req , res ) {
    
    let dose = req.body;
    let input = [];
    const sale_id = dose[ "sale_id" ];
    input.push( sale_id ) , delete dose[ "sale_id" ];
    //const dose_id = dose[ "dose_number" ];
    //input.push( dose_id ) , delete dose[ "dose_number" ];
    
    let query = "INSERT INTO payment_info (sale_id";
    
    for( k of Object.keys( dose ) ) {
        query += "," + k , input.push( dose[ k ] );
    }
    query += ") VALUES ("
    
    for ( let i = 0; i < input.length; i++ ) query += ( i === 0 ) ? "?" : ",?"
    query += ")";

    connection.query( query , input , function (error) {
        if ( error ) throw error;
        res.send( "Dose was inserted successfully" );
    } );

} )

app.post( "/delete_dose" , function( req, res ) {

    const sale_id = req.body[ 'sale_id' ];
    const dose_number = req.body[ 'dose_number' ];
    const query = "DELETE FROM payment_info WHERE (dose_number,sale_id) = (?,?)";
    const input = [ dose_number , sale_id ];

    connection.query( query , input , function( error ) {
        if ( error ) throw error;
        res.send( "Dose was deleted successfully" );
    } )

} );

passport.use( 'sign-in' , new LocalStrategy( function( username , password , done ) {
                const query = "SELECT * from acc WHERE (username = ? AND passcode = ?)"
                const input = [ username , password ];
                connection.query( query , input , function ( error , result ) {
                    if ( error ) throw error;
                    if ( result === [] ) {
                        return done( null , false );
                    }
                    else {
                        return done( null , result[0] );
                    }
                } )
        } ) 
);

app.post( '/sign_in' , passport.authenticate( 'sign-in' , {session: false } ) , function( req , res ) {
    res.json( { 
        user: req.user,
        timestamp : Date.now()
    } );
} )

app.post( '/update_dose' , function ( req , res ) {

    const sale_id = req.body[ 'sale_id' ];
    const doses = req.body[ 'doses' ];
    
    if ( Object.keys( doses[ 0 ] ).length !== 0 ) {
        let query = "UPDATE payment_info SET ";
        let input = [];
        let first = true;
        for( k of Object.keys( doses[ 0 ] ) ) {
            query += ( first ) ? k + " = ?" : ", " + k + " = ?";
            first = false; 
            input.push( doses[ 0 ][ k ] );
        }
        
        query += " WHERE (sale_id = ? AND dose_number = ?)"
        input.push( sale_id );
        input.push( 1 );
        connection.query( query , input , function( error ) {
            if ( error ) throw error;
        } )
    }

    if ( Object.keys( doses[ 1 ] ).length !== 0 ) {
        let query = "UPDATE payment_info SET ";
        let input = [];
        let first = true;
        for( k of Object.keys( doses[ 1 ] ) ) {
            query += ( first ) ? k + " = ?" : ", " + k + " = ?";
            first = false; 
            input.push( doses[ 1 ][ k ] );
        }
        
        query += " WHERE (sale_id = ? AND dose_number = ?)"
        input.push( sale_id );
        input.push( 2 );
        connection.query( query , input , function( error ) {
            if ( error ) throw error;
        } )
    }

    if ( Object.keys( doses[ 2 ] ).length !== 0 ) {
        let query = "UPDATE payment_info SET ";
        let input = [];
        let first = true;
        for( k of Object.keys( doses[ 2 ] ) ) {
            query += ( first ) ? k + " = ?" : ", " + k + " = ?";
            first = false; 
            input.push( doses[ 2 ][ k ] );
        }
        
        query += " WHERE (sale_id = ? AND dose_number = ?)"
        input.push( sale_id );
        input.push( 3 );
        connection.query( query , input , function( error ) {
            if ( error ) throw error;
        } )
    }

    if ( Object.keys( doses[ 3 ] ).length !== 0 ) {
        let query = "UPDATE payment_info SET ";
        let input = [];
        let first = true;
        for( k of Object.keys( doses[ 3 ] ) ) {
            query += ( first ) ? k + " = ?" : ", " + k + " = ?";
            first = false; 
            input.push( doses[ 3 ][ k ] );
        }
        
        query += " WHERE (sale_id = ? AND dose_number = ?)"
        input.push( sale_id );
        input.push( 4 );
        connection.query( query , input , function( error ) {
            if ( error ) throw error;
        } )
        res.send( "Doses were updated successfuly" );
    }
    else {
        res.send( "Doses were updated successfuly" );
    }
    
} )

app.post( '/delete_customer' , function( req , res ) {

    let spcode = req.body[ 'spcode' ];
    const query = "DELETE from CUSTOMER WHERE spcode = ?";
    connection.query( query , [ spcode ] , function( error ) {
        if ( error ) throw error;
        res.send( "Customer was deleted successfuly" );
    } );
    
} )

app.post( '/delete_customers' , function( req , res ) {

    let spcodes = req.body[ 'spcodes' ];
    let input = [];
    let query = "DELETE from CUSTOMER WHERE ("
    for( let i = 0; i < spcodes.length; i++ ) {
        query += i === 0 ? "spcode = ?" : " OR spcode = ?";
        input.push( spcodes[ i ][ 'spcode' ] );
    }
    query += ")";
    connection.query( query , input , function( error ) {
        if( error ) throw error;
        res.send( "Customers were deleted successfully" );
    } );

} );

app.post( '/add_parameters' , ( req , res ) => {

    let parameter = Object.keys( req.body )[ 0 ];
    switch( parameter ) {
        case apotelesma:
            let query = "INSERT INTO "
    }

} )