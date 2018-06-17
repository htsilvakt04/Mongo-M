module.exports = (req) => {
    const user = req.session.user;
    return {
        name: user.name || '',
        email: user.email || ''
    }
}