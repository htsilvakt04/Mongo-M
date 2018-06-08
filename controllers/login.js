const User = require('../modal/User');
const socialHandle = require('./handler/social');

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

const verifySocial = (req, res) => {
    const {name} = req.params;

    switch (name) {
        case 'facebook':
            return socialHandle.facebook(req, res);
        case 'google':
            return socialHandle.google(req, res);
        default:
            return res.send('Not support yet!');
    }
}



module.exports = {
    showFormOrRedirect,
    logUserIn,
    verifySocial
};