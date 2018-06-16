const Cart = require('../modal/Cart').model;

const retrieveCarts = (req, res) => {
    const user_id = req.session.user.user_id;

    Cart.find({user_id}, {items: 1, _id: 0})
        .then( (items, err) => {
            setTimeout(() => {
                const arrayOfItems = items[0].items;
                return res.json({data: arrayOfItems})
            }, 3000) // TODO: remove the set Timeout
        });

}

module.exports = {
    retrieveCarts
};