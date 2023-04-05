const mongoose = require('mongoose');

const ListingSchema = mongoose.Schema({
    
    // id field automatically added on post

    itemId: {
        type: Number,
        required: true
    },
    providerId: {
        type: Number,
        required: true
    },
    dateAvailable: {
        type: Date,
        required: true
    },
    locationAvailable: {
        type: String,
        required: true
    },
    photosUrl: {
        type: String,
        required: false
    },
    deliveryOptionsAvailable: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Listing', ListingSchema);