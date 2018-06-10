const axios = require('axios');
const Error = require('../../config');
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
    const url = 'https://graph.facebook.com/me';
    const data = {
        params: {access_token, fields: 'name,email,picture'}
    }
    return axios.get(url, data).then( ({data}) => data).catch(err => err);
}

function detectErrorFromToken(Token) {
    const result = {
        message: null,
        code: null
    }
    if (!Token.isValid || !Token) { // send back error res immediately
        result.code = 403;
        result.message = Error.INVALID_TOKEN
    }
    if (Token.scopes.indexOf('email') < 0) {
        result.code = 400;
        result.message = Error.MISSING_EMAIL
    }
    return result;
}

module.exports = {
    hydrateFBToken,
    hydrateGoogleToken,
    constructDataFB,
    constructDataGoogle,
    checkValidFBToken,
    detectErrorFromToken,
    getFBUserInfo
}