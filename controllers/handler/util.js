const axios = require('axios');

function hydrateFBToken (code) {
    return code.accessToken || null;
}
function hydrateGoogleToken(body) {
    
}

function constructDataFB(token) {
    return {
        params: {
            input_token: token,
            access_token: process.env.FACE_BOOK_APP_TOKEN // App_access_token
        }
    }
}

function constructDataGoogle() {

}

function checkValidFBToken(dataToSend) {
    const url = 'https://graph.facebook.com/debug_token';

    return axios.get(url, dataToSend)
        .then( response => {
            const data = response.data.data;
            if (!data.is_valid || data.app_id !== process.env.FACEBOOK_KEY) {
                // Todo: should check scopes as well => reAsk permission if no email
                return {
                    isValid: false
                }
            }
            return {
                isValid: true,
                user_id: data.user_id,
                scopes: data.scopes
            }
        })
}

function getFBUserInfo(access_token) {
    return axios.get('https://graph.facebook.com/me', {params: {access_token, fields: 'name,email'}}).then( ({data}) => {
        console.log('ahihi------___--ahihi', data)
    })
}


module.exports = {
    hydrateFBToken,
    hydrateGoogleToken,
    constructDataFB,
    constructDataGoogle,
    checkValidFBToken,
    getFBUserInfo
}