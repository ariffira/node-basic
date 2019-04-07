// add mongoose package
const mongoose = require('mongoose');
// add mongoose Schema object
const Schema = mongoose.Schema;

//create a new Schema for user
const userSchema = new Schema({
    name: String,
    username: String,
    email: String,
    address: String,
    bio: String,
    website: String,
    phone: String,
    salary: String,
    job_title: String,
    image: String,
    createdAt: Date
});

// make new user Schema as a model for use
// model(function name for model, schema data)
const User = mongoose.model('User', userSchema);

// make it usable to the application
module.exports = User;


