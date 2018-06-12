const mongoose = require('mongoose');
const SocialClient = require('./Social_Client');
const Cart = require('./Cart').schema;
const util = require('./util/extractUserDataFromSocial');
// name, email, image, id, language
const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    avatar: String,
    language: String,
    client: {
        type: [SocialClient]
    },
    cart: {
        type: [Cart]
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

UserModel.createFromFB = async function (userInfo) {
    const dataToCreate = util.constructUserDataFromFB(userInfo); // just construct SocialClient data
    const email = dataToCreate.email;

    const isBasicUserExisted = await this.findOne({email}).then((doc, err) => doc);

    if (isBasicUserExisted) {
        await this.updateOne({email}, {$set: {client: [dataToCreate]}});
        return isBasicUserExisted;
    }

    return await this.create({
        name: dataToCreate.user_name,
        email: dataToCreate.email,
        avatar: dataToCreate.avatar,
        client: dataToCreate
    }).then((user, err) => user);
};
// client:
module.exports = UserModel;