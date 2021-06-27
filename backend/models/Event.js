const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    uid: String,
    from: String,
    fromPass: String,
    to: String,
    cc: String,
    subject: String,
    month: String,
    weekday: String,
    date: String,
    hours: String,
    minutes: String,
    seconds: String,
    flag: Boolean,
    type: String,
    body: String,
    error: String
    },
    {
        timestamps: true
    }
);

const Event =  mongoose.model('Event', eventSchema);

module.exports = { Event, eventSchema };