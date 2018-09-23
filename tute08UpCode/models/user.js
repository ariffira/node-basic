// add mongoose package
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// add mongoose Schema object
const Schema = mongoose.Schema;

//create a new Schema for user
const userSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    createdAt: Date
});

// make new user Schema as a model for use
// model(function name for model, schema data)
const User = mongoose.model('User', userSchema);

// make it usable to the application
module.exports = User;

//shortcut of above 2 line
// const User = module.exports = mongoose.model('User', userSchema);

// Add user and hash password before
module.exports.addUser = function (newUser, callback) {
    // Save user data using bcryptjs
    const saltRounds = 5;
    // encrypt password first using salt
    bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
        if(err) throw err;
        // make hash as your new password
        newUser.password = hash;
        // save all data to DB now
        newUser.save(callback);
    });
};