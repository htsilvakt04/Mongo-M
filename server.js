require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const indexRouter = require('./routes');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const logoutRouter = require('./routes/logout');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

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
        cookie: { maxAge: Number(process.env.COOKIE_LIFE_TIME) }, // 15 days
        store: new MongoStore({
            mongooseConnection: connection,
            touchAfter: 24 * 3600, // time period in seconds,
            ttl: Number(process.env.TTL_TIME) // = 3 days.
        })
    }));

    app.use('/', indexRouter);
    app.use('/login', loginRouter);
    app.use('/register', registerRouter);
    app.use('/logout', logoutRouter);

    return app;
};