const express = require('express');
const router = express.Router();
const mysql = require('mysql')
const sqlConnect = require('../config/mysqlConfig');

// Create: INSERT new data into table
router.post('/add', (req, res)=> {
  let { name, email, age } = req.body;
  console.log(req.body);
  // query for insert data
  const query = "INSERT INTO teachers SET ?";
  //const query = "INSERT INTO teachers (name, email age) VALUES ?";
  sqlConnect.query(query,{ name, email, age },(err, result)=> {
      if(err) throw err;
      res.redirect('/teacher/list');
  })
});

router.get('/list', (req, res)=> {
   // select all teachers data
   const query = "SELECT * from teachers";
   sqlConnect.query(query, (err, result)=> {
       if(err) throw err;
       res.json(result)
       //res.render('list');
   })
});

router.get('/testJoin', (req, res)=> {
   const query = "SELECT product.product_name, product.price, customer.customer_name, customer.address, customer.email, customer.age FROM product INNER JOIN customer ON product.customer_id = customer.id";

   sqlConnect.query(query, (err, result)=> {
       if(err) throw err;
       //res.json(result);
       res.render('list', {
           data: result
       });
   })
});

module.exports = router;