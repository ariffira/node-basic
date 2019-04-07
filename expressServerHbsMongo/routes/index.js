const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index');
// first route
router.get('/', indexController.getIndex);

// users/list route
router.get('/users/list', indexController.getUsers);

// user/12121
router.get('/user/:id', indexController.getUserById);

// user/any@email.com/admin/121
router.get('/user/:email/admin/:id', indexController.getUserByEmailId);

// user/table
router.get('/user/table', indexController.getUsers);

module.exports = router;