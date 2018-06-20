require('dotenv').config();
require('newrelic');
const compression = require('compression');
const express = require('express');
const xss = require("xss");
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const indexRouter = require('./routes');
const apiRouter = require('./routes/api');
app.use(compression());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use('/static', express.static(__dirname + '/client/static'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.locals.errors = [];
app.locals.loginKey = {
    facebook: process.env.FACEBOOK_KEY,
    google: process.env.GOOGLE_KEY
}

module.exports = (connection) => {

    app.use(session({
        secret: 'silva-handsome',
        name: 'silvaApp-session',
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: Number(process.env.COOKIE_LIFE_TIME), httpOnly: false }, // 15 days
        store: new MongoStore({
            mongooseConnection: connection,
            touchAfter: 24 * 3600, // time period in seconds,
            ttl: Number(process.env.TTL_TIME) // = 3 days.
        })
    }));

    app.use('/', indexRouter);
    app.use('/api', apiRouter);

    app.use('*', (req, res) => {
        return res.render('home');
    })
    return app;
};