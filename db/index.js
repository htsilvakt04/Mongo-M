const mongoose = require('mongoose');
// mongoose.set('debug', true); //***turn this on when you need to debug query in mongoose
const assert = require('assert');
// Connection URL
let url = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@ds233769.mlab.com:33769/heroku_2vq24zh5';
mongoose.connect(url);
const db = mongoose.connection;

db.on('disconnected', function() {
    mongoose.disconnect();
});
db.on('error', function(err) {
    console.log(err);
});

module.exports = () => {
    return new Promise( (resolve, reject) => {
        db.once('open', () => {
            resolve(db);
        });
        db.on('error', (err) => {
            reject(err);
        });
    });
}

