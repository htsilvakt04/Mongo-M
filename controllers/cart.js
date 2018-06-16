const Cart = require('../modal/Cart').model;

const retrieveCarts = (req, res) => {
    const user_id = req.session.user.user_id;

    Cart.find({user_id})
        .then( (items, err) => res.json({data: items}));
}

module.exports = {
    retrieveCarts
};