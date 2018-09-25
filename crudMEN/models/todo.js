// add mongoose package
const mongoose = require('mongoose');
// add mongoose Schema object
const Schema = mongoose.Schema;

//create a new Schema for todo
const todoSchema = new Schema({
    todo: String,
    createdAt: Date
});

// make new todo Schema as a model for use
// model(function name for model, schema data)
const Todo = mongoose.model('Todo', todoSchema);

// make it usable to the application
module.exports = Todo;

//shortcut of above 2 line
// const Todo = module.exports = mongoose.model('Todo', todoSchema);

