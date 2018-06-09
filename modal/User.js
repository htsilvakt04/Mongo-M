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

UserModel.createFromFB = async function (userInfo) {
    const dataToCreate = util.constructUserDataFromFB(userInfo); // just construct SocialClient data
    const email = dataToCreate.email;

    const isBasicUserExisted = await this.findOne({email}).then( (doc,err ) => doc);
    console.log('---___---', dataToCreate);
    if (isBasicUserExisted) {
        await this.updateOne({email}, {$set: {client: [dataToCreate]}})
    } else {
        // fill to the basic and the client as well
    }
    // return this.create(dataToCreate).then((user, err) => user);
};
// client:
module.exports = UserModel;