require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const session      = require("express-session");
const MongoStore   = require("connect-mongo")(session)
var dateFormat = require('dateformat');


mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology:true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true, 
  saveUninitialized: false,
  cookie: { maxAge: 6000000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}));
      
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Women in Tech';



const index = require('./routes/index');
app.use('/', index);
app.use('/', require('./routes/auth'))
app.use('/', require('./routes/allEvents'))
app.use('/', require('./routes/createEvent'))
app.use('/', require('./routes/myEventsCreated'))
app.use('/', require('./routes/detailEvent'))
app.use('/', require('./routes/attendEvents'))
app.use('/', require('./routes/careers'))

app.listen(3000, () => console.log('on port 3000'));

module.exports = app;