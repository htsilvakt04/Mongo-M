module.exports = {
    redirectIfLoggedin: (req, res) => {
        if (req.session.user) {
            return res.redirect('/')
        }
    }
}