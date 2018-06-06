const User = require('../modal/User');

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
    const {name} = req.params;

}



module.exports = {
    showFormOrRedirect,
    logUserIn,
    redirectSocial,
    verifySocial
};