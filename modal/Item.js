const mongoose = require('mongoose');
const Review = require('./Review');

// name, email, image, id, language
const ItemSchema = mongoose.Schema({
    _id: Number,
    title: String,
    slogan: String,
    description: String,
    stars: String,
    category: String,
    img_url: String,
    price: String,
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