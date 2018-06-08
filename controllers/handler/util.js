function hydrateFBToken (body) {

}
function hydrateGoogleToken(body) {
    
}

function constructDataFB(token) {
    return {
        params: {
            input_token: token,
            access_token: '1877035595944613|hAWUE7vp8t55nyGgfOWCOo0GAvI' // App_access_token
        }
    }
}

function constructDataGoogle() {

}

function checkValidFBToken(dataToSend) {
    return axios.get('https://graph.facebook.com/debug_token', dataToSend)
        .then(({data}) => {
            // check if token is valid or not then return boolean
            return {
                isValid: true, // more
                user_id: data.user_id
            }; // hard code right now
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