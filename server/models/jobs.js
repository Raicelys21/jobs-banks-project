const mongoose = require('mongoose');

const jobsSchema = mongoose.Schema({
    company: String,
    type: String,
    logo: String,
    url: String,
    position: String,
    location: String,
    category: String,
    description: String, 
    howapply: String,
    email: String,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('jobs', jobsSchema);