const Cart = require('../modal/Cart').model;
const getUserFromSession = require('../routes/session');
const retrieveCarts = (req, res) => {
    const user_id = req.session.user.user_id;

    Cart.find({user_id}, {items: 1, _id: 0})
        .then( (items, err) => {
            if (items.length < 1) return res.json({data: items, user: getUserFromSession(req)});
            const arrayOfItems = items[0].items;
            return res.json({
                data: arrayOfItems,
                user: getUserFromSession(req)
            })
        });
}

const saveItemToCart = (req, res) => {
    const user_id = req.session.user.user_id;
    const { item_id } = req.body;
    // find in cart if there is item exists or not
    Cart.findItemById(item_id, user_id).then( doc => {
        if (doc !== null) return res.status(403).send('No way!');
        // if not => ok... save the item to cart with quantity of 1s
        Cart.saveItem(item_id, user_id).then( doc => {
            return doc.user_id === user_id ? res.send({item_id}) : res.status(500).send('Can not save item to cart')
        })
    }).catch(err => res.status(500).send('Can not find item in cart'))
    // if found then just ignore the request
}
const updateItemQuantity = (req, res) => {
    const { item_id, quantity } = req.body;
    const user_id = req.session.user.user_id;

    Cart.findOneAndUpdate({user_id, "items._id": item_id}, {$set: {"items.$.quantity": quantity}}, {new: true})
        .then(() => res.json({item_id, quantity}))
        .catch(() => res.status(500).send('Can not update quantity'));
}

const removeItemOutOfCart = (req, res) => {
    const { item_id } = req.body;
    const user_id = req.session.user.user_id;

    Cart.findOneAndUpdate({user_id, "items._id": item_id}, {$pull: {items: {_id: item_id}}}, {new: true})
        .then((doc) => res.json({item_id}))
        .catch(() => res.status(500).send('Can not update quantity'));

}
module.exports = {
    retrieveCarts,
    saveItemToCart,
    updateItemQuantity,
    removeItemOutOfCart
};