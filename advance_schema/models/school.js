const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schoolSchema = new Schema({
    name: { type:String, required: [true, 'Please give School Name!']},
    address: {
        street: String,
        zip: Number,
        city: String
    }
});

const School = mongoose.model('School', schoolSchema);

module.exports = School;

