const mongoose = require('mongoose');

const filterSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    filter: {
        Age: {
            type: String,
            required: true
        },
        Gender: {
            type: String,
            required: true
        },
        DateRange: {
            type: Array,
            required: true
        }
    }
})


module.exports = mongoose.model('Filter', filterSchema);
