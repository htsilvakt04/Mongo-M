const mongoose = require('mongoose');
const Item = require('../modal/Item').schema;

const CartSchema = mongoose.Schema({
    _id: String,
    user_id: String,
    items: {
        type: [Item]
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

module.exports = {
    model: CartModel,
    schema: CartSchema
};