const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index');
// first route
router.get('/', indexController.getIndex);

module.exports = router;