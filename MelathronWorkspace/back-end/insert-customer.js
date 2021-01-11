const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "CoronaVirus2020",
  database: "melathron",
});
app.disable("x-powered-by");

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/send", (req, res) => {
  const customer = req.body;

  var str1 = "INSERT INTO customer (";
  var str2 = " VALUES (";

  var keys = Object.keys(customer);
  var values = Object.values(customer);

  const value = values.map((el) => stringify(el));
  str1 += foldl("", keys);
  str2 += foldl("", value);
  str2 += ";";
  const query = str1 + str2;

  connection.connect();
  connection.query(query, function (error, results) {
    if (error) throw error;
    console.log("Query is done");
  });
  console.log(customer);
  res.sendStatus(200);
});

app.get("/customers", (req, res) => {
  const query = "SELECT * from customer";
  connection.query(query, function (error, results) {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/locations", (req, res) => {
  const query = "SELECT * from location";
  connection.query(query, function (error, results) {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/professions", (req, res) => {
  const query = "SELECT * from job";
  connection.query(query, function (error, results) {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/apotelesmata", (req, res) => {
  const query = "SELECT * from apotelesma";
  connection.query(query, function (error, results) {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/salesman", (req, res) => {
  const query = "SELECT * from salesman";
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

function foldl(init, l) {
  return l.length == 1
    ? init + l[0] + ")"
    : foldl(init + l[0] + ",", l.slice(1));
}
function stringify(el) {
  return typeof el === "string" ? "'" + el + "'" : el;
}
