
//Initialize express
const express = require('express');
const mysql = require('mysql');
const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.get('/', (req,res) =>{
     res.send('<h1>Hello world</h1>');
});

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'melathron'
});

connection.connect();
/*const query = "INSERT INTO subscription (subscription_name) VALUES ('2008 ΜΕΛΟΣ');";
connection.query(query,function (error,fields) {
    if (error) throw error;
    console.log('The solution is: ', fields);
});*/

const query = "SELECT * from subscription"
connection.query(query,function (error,results) {
    if (error) throw error;
    console.log('The solution is: ', results[0].subscription_name);
});