const mongoose = require('mongoose');
const assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27017/mongo-session';
mongoose.connect(url);
const db = mongoose.connection;


module.exports = () => {
    return new Promise( (resolve, reject) => {
        db.once('open', () => {
            resolve(db);
        });
        db.on('error', () => {
            reject(db);
        });
    });
}

