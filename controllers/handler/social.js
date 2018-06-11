const util = require('./util');
const User = require('../../modal/User');
const Error = require('../../config');
const axios = require('axios');
const queryString = require('query-string');

const facebook = (req, res) => {
    const {code} = req.body

    const access_token = util.hydrateFBToken(code)
    const dataTosend = util.constructDataFB(access_token)

    async function main() {
        const Token = await util.checkValidFBToken(dataTosend);
        const TokenError = util.detectErrorFromToken(Token);

        if (TokenError.message) {
            return Promise.reject({code: TokenError.code, message: TokenError.message});
        }

        let user = await User.findOne({'client.client_user_id': Token.user_id}).then((doc, err) => doc)

        if (! user) {
            const userInfo = await util.getFBUserInfo(access_token)
            userInfo.access_token = access_token

            user = await User.createFromFB(userInfo)
        }

        return new Promise( resolve => {
            req.session.regenerate( (err) =>  {
                const data = {email: user.email, id: user._id, name: user.name || null}
                req.session.user = data
                resolve (data)
            })
        })

    }

    main()
        .then((data) => res.status(200).send(data))
        .catch( err => {
            const code = err.code || 400;
            const message = err.message || 'Error';

            return res.status(code).send(message);
        });
}

const google = (req, res) => {
    const {code} = req.body;

    const url = 'https://www.googleapis.com/oauth2/v4/token';
    const data = queryString.stringify({
        code,
        client_id: process.env.GOOGLE_KEY,
        client_secret: process.env.GOOGLE_SECRET,
        redirect_uri: 'http://localhost:3000',
        grant_type: 'authorization_code'
    });

    async function main () {
        // send code to receive access_token + id_token
        const result = await axios.post(url, data)
            .then( response => response.data).catch( err => console.log(err));
        const {access_token} = result;
        const dataUrl = `https://www.googleapis.com/plus/v1/people/me?access_token=${access_token}`;

        // use the refresh_token to look in DB seeing the user_id or email
        // find log them in && then save a new record to access_token for later use
        const userInfo = await axios.get(dataUrl).then(response => response.data);
        // ELSE send api to ger user info then create NEW USER and log them in


    }
    main().then().catch() // send back data to React side saying that ok
}

module.exports = {
    facebook,
    google
}







