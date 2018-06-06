const User = require('../modal/User');

const showFormOrRedirect = (req, res) => {
    if (!req.session.user) {
        return res.render('register')
    }
    return res.redirect('/');
}

const regiterUser =  (req, res) => {
    // filter xss here
    const {email, password} = req.body;

    User.findOne({email}).then( result => {
        if (result) {
            return res.render('register', {
                errors: ['email already exists, please login using this email']
            })
        }

        User.create({email, password}).then( (result, err) => {
            req.session.regenerate( err => {
                // find then plug info to session
                req.session.user = {email: result.email};
                return res.redirect('/content');
            })
        })
    })
}



module.exports = {
    showFormOrRedirect,
    regiterUser
};