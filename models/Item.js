const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    // Need to have a uuid as well
    name: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    producer: {
        type: String,
        required: false
    },
    dateListed: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Items', ItemSchema);