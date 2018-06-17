const auth = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    return res.status(400).send('Error');
};


module.exports = auth;