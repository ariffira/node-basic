const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// Create/ADD todo
router.post('/addTodo', (req, res)=> {
    // create a new todo object as like your todo schema
    let newTodo = new Todo({
        todo: req.body.todo,
        createdAt: Date.now()
    });
    // create new user and save data to DB
    newTodo.save(err => {
        if(err) throw err;
        console.log('A new Todo Saved to Database!');
        res.redirect('/');
    });
});

/* Read/GET todo list using find*/
router.get('/list', function(req, res, next) {
    const query = Todo.find().sort({'createdAt': -1}).limit(4);
    query.exec(function (err, result) {
        if(err) throw err;
        console.log(result);
        res.render('todos', { todos: result });
    });
});

/* Read/GET specific todo  using findOne*/
router.get('/detail/:id', function(req, res, next) {
    let todoId = req.params.id;
    const query = Todo.findOne({ _id: todoId});
    query.exec(function (err, result) {
        if(err) throw err;
        console.log(result);
        res.render('todoDetail', { todo: result });
    });
});

/* GET specific todo  using findById*/
router.get('/update/:id', function(req, res, next) {
    let todoId = req.params.id;
    const query = Todo.findById({ _id: todoId});
    query.exec(function (err, result) {
        if(err) throw err;
        console.log(result);
        res.render('todoUpdate', { todo: result });
    });
});

/* Update specific todo  using findById */
router.post('/update', function(req, res, next) {
    let todoId = req.body.id;
    const query = Todo.findById({ _id: todoId});
    query.exec(function (err, result) {
        if(err) throw err;
        // change old value with new
        result.todo = req.body.todo;
        result.createdAt = Date.now();
        // save updated results
        result.save(err => {
            if(err) throw err;
            console.log('Todo Updated....!');
            res.redirect('/todos/list');
        });
    });
});

/* Delete todo using findByIdAndRemove */
router.get('/delete/:id', function (req, res) {
    let todoId = req.params.id;
    const query = Todo.findByIdAndRemove({ _id: todoId});
    query.exec(function (err) {
        if(err) throw err;
        console.log(todoId +'Todo Has been Deleted.....')
        res.redirect('/todos/list');
    });
});

module.exports = router;
