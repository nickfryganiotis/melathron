const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "melathron",
});

router.get( '/biographies' , ( req , res ) => {
    const query = "SELECT * FROM biographies";
    connection.query( query , ( error , results ) => {
        if ( error ) throw error;
        res.json( {
          biographies: results
        } )
    } )
} );

router.post( '/add_biography' , ( req , res ) => {
    const biography_name = req.body[ 'biography' ];
    const spcode = req.body[ 'spcode' ];
    const query = "INSERT INTO biography_history SET `biography_id` = ( SELECT biography_id FROM biographies WHERE biography_name = ?) , `spocde` = ?";
    connection.query( query , [ biography_name , spcode ] , ( error ) => {
        if ( error ) throw error;
        res.send( "Biography added successfully" );
    } );
} );

router.post( '/delete_biography' , ( req , res ) => {
    const biography_name = req.body[ 'biography' ];
    const instance_date = req.body[ 'instance_date' ];
    const spcode = req.body[ 'spcode' ];
    const query = `DELETE FROM biography_history WHERE( spcode = ? AND insstance_date = ? and biography_id = 
                   (SELECT biography_id FROM biography WHERE biography_name = ?))`
    connection.query( query , [ spcode , instance_date , biography_name ] , ( error ) => {
        if ( error ) throw  error;
        res.send( "Biography deleted successfully" );
    } );
} );



module.exports = router;