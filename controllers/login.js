const User = require('../modal/User');
const axios = require('axios');
const queryString = require('query-string');

const showFormOrRedirect = (req, res) => {
    if (!req.session.user) {
       return res.render('login')
    }
    return res.redirect('/');
}
const logUserIn = (req, res) => {
    // prevent xss
    const {email, password} = req.body;

    User.findOne({email, password}).then( result => {
        if (!result) { // if don't find flash back the message
            return res.render('login', {
                errors: ["crudential doesn't match"]
            })
        }
        req.session.regenerate( err => {
            // find then plug info to session
            req.session.user = {email: result.email};
            return res.redirect('/content');
        })
    })
}

const redirectSocial = (req, res) => {
    const {name} = req.params;

}

const verifySocial = (req, res) => {
    const {name} = 'facebook'; // req.params;
    const {code} = req.body;

    // TODO: check if request.header !=== X-Requested-With

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
        const dataUrl = `https://www.googleapis.com/plus/v1/people/me?access_token=${access_token}`

        // use the refresh_token to look in DB seeing the user_id or email
        // IF find log them in
        const userInfo = await axios.get(dataUrl).then(response => response.data);
        // ELSE send api to ger user info then create NEW USER and log them in
        console.log('---___---', userInfo);


    }
    main().then(); // send back data to React side saying that ok

}



module.exports = {
    showFormOrRedirect,
    logUserIn,
    redirectSocial,
    verifySocial
};