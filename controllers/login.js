const User = require('../modal/User');
const loginController = {

    showFormOrRedirect: (req, res) => {
        if (!req.session.user) {
           return res.render('login')
        }
        return res.redirect('/');
    },
    logUserIn: (req, res) => {
        const {email, password} = req.body;

        User.findOne({email, password}).then( result => {
            if (!result) { // if don't find flash back the message
                // flash back message
            }
            // find then plug info to session
            req.session.user = {email: result.email};
            return res.redirect('/content');
        })
    }

}


module.exports = loginController;