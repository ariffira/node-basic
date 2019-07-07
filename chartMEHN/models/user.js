const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// user schema structure
const userSchema = new Schema({
    // all schema attribute here
});

const User = mongoose.model('User', userSchema);
module.exports = User;