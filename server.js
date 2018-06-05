const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const indexRouter = require('./routes');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

module.exports = (connection) => {
    app.use(session({
        secret: 'silva-handsome',
        name: 'silvaApp-session',
        cookie: { maxAge: 864000 },
        store: new MongoStore({
            mongooseConnection: connection,
            ttl: 7 * 24 * 60 * 60 // = 7 days
        })
    }));

    app.use('/', indexRouter);
    app.use('/login', loginRouter);
    app.use('/logout', logoutRouter);

    return app;
};