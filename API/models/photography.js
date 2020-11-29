const mongoose = require('mongoose'); // import library

let newPhotographySchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        required: true
    },
    pictures: []
})

let photography = module.exports = mongoose.model("photography", newPhotographySchema)