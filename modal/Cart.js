const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
    _id: String,
    user_id: String,
    items: Array,
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