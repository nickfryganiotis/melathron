const createError = require( 'http-errors' );
const express = require( 'express' );
const cookieParser = require( 'cookie-parser' );
const logger = require( 'morgan' );
const signInRouter = require( './routes/sign-in' );
const gettersRouter = require( './routes/getters' );
const locationParametersRouter = require( './routes/location-parameters')
const passport = require('passport');

let app = express();

app.use( logger('dev') );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );
app.use( cookieParser() );

app.use( passport.initialize() );
app.use( '/' , signInRouter );
app.use( '/' , gettersRouter );
app.use( '/' , locationParametersRouter );

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// catch 404 and forward to error handler
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use( function ( err, req , res , next ) {
  const status = err.status || 500;
  if( status >= 500 || req.app.get( 'env' ) === 'development' ) {
    console.log( err.stack );
  }
  next( err );
} );

// error handler
app.use(function(err, req, res, next) {
  const status = err.status || 500;
  res.status( status );
  //In case of an internal error(status >=500) we don't want to send this error to the user
  const message = ( status >= 500 ) ? "internal error" : err.message;
  //In case of development mode see exactly where is the problem that created the internal error
  const expose = ( status >= 500 ) && req.app.get( 'env' ) === 'development';
  res.end( expose ? message + '\n\n' + err.stack : message );

  //Json sets content-type header. This is also the difference between 'end' and 'send'
  //'res.send()' includes also the content-type, except from a simple string
});


module.exports = app;
