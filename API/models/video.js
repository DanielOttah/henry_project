const mongoose = require('mongoose'); // import library

let newVideoSchema = mongoose.Schema({
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
    videos: []
})

let video = module.exports = mongoose.model("video", newVideoSchema)