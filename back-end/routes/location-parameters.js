const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "melathron",
});

router.post( '/location_parameters' , ( req , res ) => {
    const country_id = req.body[ 'country_id' ];
    let output = [];
    let query = "SELECT * FROM state WHERE country_id = ?";
    connection.query( query , country_id , ( error , result ) => {
        if ( error ) throw error;
        output.push( result );
    } );
    query = "SELECT * FROM area WHERE country_id = ?";
    connection.query( query , country_id , ( error , result ) => {
        if ( error ) throw error;
        output.push( result );
    } );
    query = "SELECT * FROM city where country_id = ?";
    connection.query( query , country_id , ( error , result ) => {
        if ( error ) throw error;
        output.push( result );
        res.send( output );
    } );
} );

module.exports = router;