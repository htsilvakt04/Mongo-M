const mongoose = require('mongoose');
// name, email, image, id, language
const ReviewSchema = mongoose.Schema({
    name: String,
    comment: String,
    starts: Number,
    data: {
        type: Date,
        default: Date.now()
    }
})

// client:
module.exports = ReviewSchema;