const mongoose = require('mongoose');
const Review = require('./Review');

// name, email, image, id, language
const ItemSchema = mongoose.Schema({
    _id: String,
    title: String,
    slogan: String,
    description: String,
    stars: Number,
    category: String,
    img_url: String,
    price: Number,
    reviews: {
        type: [Review]
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

const ItemsModel = mongoose.model('Item', ItemSchema);

// client:
module.exports = {
    model: ItemsModel,
    schema: ItemSchema
};