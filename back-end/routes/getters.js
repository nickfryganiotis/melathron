const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "melathron",
});

router.get(  '/professions' ,  ( req, res ) => {
    const query = "SELECT * FROM profession;";
    connection.query( query , ( error , results ) => {
        if ( error ) throw error;
        res.json( {
            professions: results
        } );
    });
});

router.get( '/categories' , ( req , res ) => {
    const query = "SELECT * FROM category;";
    connection.query( query , ( error ,  results ) => {
        if ( error ) throw error;
        res.json( {
            categories: results
        } );
    });
});

router.get( '/salesman' , ( req , res ) => {
    const query = "SELECT * FROM salesman;";
    connection.query( query , ( error , results ) => {
        if (error) throw error;
        res.json( {
            salesman: results
        } );
    });
});

router.get( '/shipping_methods' , ( req, res ) => {
    const query = "SELECT * FROM shipping_method;";
    connection.query( query , ( error , results ) => {
        if ( error ) throw error;
        res.json( {
            shipping_methods: results
        } );
    });
});

router.get( '/customers' , ( req, res ) => {
    const query = "SELECT * FROM customer";
    connection.query(query, ( error , results ) => {
        if ( error ) throw error;
        res.json( {
            customers: results
        } );
    });
});

router.get( '/continents' , ( req, res ) => {
    const query = "SELECT * FROM continent";
    connection.query( query , ( error , results ) => {
        if ( error ) throw error;
        res.json( {
            continents: results
        } );
    });
});

router.get( '/countries' , ( req, res ) => {
    const query = "SELECT * FROM country";
    connection.query( query , ( error , results ) => {
        if ( error ) throw error;
        res.json( {
            countries: results
        } );
    });
});

module.exports = router;