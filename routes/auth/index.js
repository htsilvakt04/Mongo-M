const auth = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    return res.status(401).send('No authentication');
};


module.exports = auth;