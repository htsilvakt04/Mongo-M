const Cart = require('../modal/Cart').model;

const retrieveCarts = (req, res) => {
    const user_id = req.session.user.user_id;

    Cart.find({user_id}, {items: 1, _id: 0})
        .then( (items, err) => {
            if (items.length < 1) return res.json({data: items});
            const arrayOfItems = items[0].items;
            return res.json({data: arrayOfItems})
        });
}

const saveItemToCart = (req, res) => {
    const user_id = req.session.user.user_id;
    const { item_id } = req.body;

    // find in cart if there is item exists or not
    Cart.findItemById(item_id, user_id).then( doc => {
        if (doc !== null) return res.status(403).send('No way!');

        // if not => ok... save the item to cart with quantity of 1s
        Cart.saveItem(item_id, user_id).then( doc =>
            doc.nModified === 1 ? res.send('ok') : res.status(500).send('Can not save item to cart')
        )
    }).catch(err => res.status(500).send('Can not find item in cart'))

    // if found then just ignore the request



}

module.exports = {
    retrieveCarts,
    saveItemToCart
};