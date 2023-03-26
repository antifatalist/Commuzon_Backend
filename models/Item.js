const mongoose = require('mongoose');

const ItemQuantitySchema = mongoose.Schema({
    value: {
        type: Number,
        required: true
    },
    units: {
        type: String,
        required: false
    }
});

const ItemSchema = mongoose.Schema({

    // id field automatically added on post

    name: {
        type: String,
        required: true
    },
    quantity: {
        type: ItemQuantitySchema,
        required: true
    },
    productId: {
        type: Number,
        required: true
    },
    producerId: {
        type: Number,
        required: false
    },
    possessorId: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    dateProduced: {
        type: Date,
        required: false
    },
    locationProduced: {
        type: String,
        required: false
    },
    photosUrl: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Item', ItemSchema);