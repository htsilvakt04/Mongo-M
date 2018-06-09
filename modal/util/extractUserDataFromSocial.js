function constructUserDataFromFB(userInfo) {
    return {
        client: 'facebook',
        access_token: userInfo.access_token,
        client_user_id: userInfo.id,
        user_name: userInfo.name,
        avatar: userInfo.picture.data.url,
        email: userInfo.email
    }
}

module.exports = {
    constructUserDataFromFB
}