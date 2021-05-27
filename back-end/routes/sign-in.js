const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const passport = require('passport')
const LocalStrategy = require( 'passport-local' ).Strategy;

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "melathron",
});

passport.use( 'sign-in' , new LocalStrategy( ( username , password , done ) => {
        const query = "SELECT * from acc WHERE (username = ? AND passcode = ?)"
        const input = [ username , password ];
        connection.query( query , input , function ( error , result ) {
            if ( error ) throw error;
            if ( result === [] ) {
                return done( null , false );
            }
            else {
                return done( null , result[ 0 ] );
            }
        } )
    } )
);

router.post( '/sign_in' , passport.authenticate( 'sign-in' , {session: false } ) , ( req , res ) => {
    res.json( {
        admin_privilege: req.user[ 'admin_prev' ],
        timestamp : Date.now()
    } );
} )

module.exports = router;