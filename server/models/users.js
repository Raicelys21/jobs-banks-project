const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    username: String,
    name: String,
    email: String,
    password: String,
    type: String
});

module.exports = mongoose.model('users', usersSchema);