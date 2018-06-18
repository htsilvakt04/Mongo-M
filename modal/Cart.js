const mongoose = require('mongoose');
const ItemInCart = require('../modal/ItemInCart');
const Item = require('../modal/Item').model;

const CartSchema = mongoose.Schema({
    _id: String,
    user_id: String,
    items: {
        type: [ItemInCart]
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    }
});

const CartModel = mongoose.model('Cart', CartSchema);

CartModel.findItemById = async function (itemId, user_id) {
    return await this.findOne({items: {$elemMatch: {_id: itemId}}, user_id}).then((doc, err) => doc)
}

CartModel.saveItem = async function (itemId, user_id) {
    // return await this.updateOne({}, {items: {$push: }}).then((doc, err) => doc)
    // const item = new ItemInCart({quantity: 1, findItemById})
    const originalItem = await Item.findOne({_id: itemId}).then( doc => doc._doc);
    const itemToSave = {...originalItem, quantity: 1};

    return await this.updateOne({user_id}, {$push: {items: itemToSave}}).then(doc => doc)
}

// mono: > carts.find({items: {$elemMatch: {_id: 4}}})

// mongoose: db.carts.find({ items: { $elemMatch: { _id: '4' } } })
module.exports = {
    model: CartModel,
    schema: CartSchema
};