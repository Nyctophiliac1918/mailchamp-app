const mongoose = require('mongoose');
const {eventSchema} = require('./Event');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    uid: String,
    events: [ eventSchema ],
    history: [ eventSchema ]
});

const User = mongoose.model('User', userSchema);

module.exports = {User, userSchema};