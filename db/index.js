const mongoose = require('mongoose');
// mongoose.set('debug', true); //***turn this on when you need to debug query in mongoose
const assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27017/mongo-session';
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

