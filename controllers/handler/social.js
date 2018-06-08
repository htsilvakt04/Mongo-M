const axios = require('axios');
const queryString = require('query-string');
const util = require('./util');
const User = require('../../modal/User');

const facebook = (req, res) => {
    const {code} = req.body;
    const access_token = util.hydrateFBToken(req.body);
    const dataTosend = util.constructDataFB(access_token);

    async function main() {
        // if valid then get the info
        const Token = await util.checkValidFBToken(dataTosend); // {isValid: true, user_id: 12, scopes: ['email', 'profile'], ...}

        if (!Token.isValid) { // send back error res immediately
            return res.status(403).send('Token is not valid');
        }
        // look in database find if the user with id exists=> log them in
        const user = await User.findOne({'client.facebook.client_user_id': Token.user_id}).then((err, doc) => doc);

        if (user !== null) {
            req.session.regenerate( err => {
                req.session.user = user
            })
        } else {
            const userInfo = await util.getFBUserInfo(Token);
            const newUser = await User.createFromFB(userInfo);
            req.session.regenerate( err => {
                req.session.user = newUser
            })
        }

        return {
            email: req.session.user.email,
            name: req.session.user.name
        }
        // otherwise send api to ger user info then create NEW USER and log them in
    }

    main()
        .then((data) => req.status(200).send(data))
        .catch(err => res.status(400).send('Error'));
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