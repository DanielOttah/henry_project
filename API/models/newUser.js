const mongoose = require('mongoose'); // import library

let newUserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

let newUser = module.exports = mongoose.model("newUser", newUserSchema)