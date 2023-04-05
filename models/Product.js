const mongoose = require('mongoose');

const ProductWeightSchema = mongoose.Schema({
    value: {
        type: Number,
        required: true
    },
    units: {
        type: String,
        required: true
    }
});

const ProductSchema = mongoose.Schema({
    
    // id field automatically added on post

    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    weight: {
        type: ProductWeightSchema,
        required: false
    },
    photosUrl: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Product', ProductSchema);