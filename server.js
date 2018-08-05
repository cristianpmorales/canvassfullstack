// server.js

// set up ======================================================================
require( './db' );
// mongoose
// get all the tools we need
const cool = require('cool-ascii-faces')
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var routes = require( './routes/index.js' );
var people = require( './routes/people.js' );
var completeL = require( './routes/completeList.js' );
var configDB = require('./config/database.js');
var static         = require( 'serve-static' );
var path           = require( 'path' );


var db

// configuration ===============================================================
mongoose.connect(configDB.url, { useMongoClient: true }, (err, database) => {
  if (err) return console.log(err)
  db = database
  require('./app/routes.js')(app, passport, db);
}); // connect to our database



require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'rcbootcamp2018a', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
// require('./app/routes.js')(app, passport, db); // load our routes and pass in our app and fully configured passport
app.get(  '/',            routes.indexpeople );
app.get(  '/edit/:id',    routes.editpeople );
app.post( '/update/:id',  routes.updatepeople );

app.get(  '/profile',           people.indexpeople);
app.post( '/createpeople',      people.createpeople);
app.get(  '/destroypeople/:id', people.destroypeople );
app.get(  '/editpeople/:id',    people.editpeople );
app.post( '/updatepeople/:id',  people.updatepeople );

app.get(  '/completedlist',      completeL.indexpeople);

app.use( static( path.join( __dirname, 'public' )));
// launch ======================================================================
app.listen(port);
console.log('Express server listening on port ' + port);
