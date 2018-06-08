const mongoose = require('mongoose');
const SocialClient = mongoose.Schema({
    client_name: String,
    access_token: String,
    refresh_token: String,
    client_user_id: String,
    user_name: String,
});

module.exports = SocialClient;