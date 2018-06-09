const mongoose = require('mongoose');
const SocialClient = require('./Social_Client');
const util = require('./util/extractUserDataFromSocial');
// name, email, image, id, language
const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    image: String,
    language: String,
    client: {
        type: [SocialClient]
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    }
});

const UserModel = mongoose.model('User', UserSchema);

UserModel.createFromFB = function (userInfo) {
    const dataToCreate = util.extractUserDataFromFB(userInfo);
    // return this.create(userInfo).then((user, err) => user);
};
// client:
module.exports = UserModel;