const express = require('express');
const router = express.Router();
// include employee model
const Employee = require('../models/employee');
const Department = require('../models/department');

router.get('/', (req, res)=> {
   res.render('index')
});

router.post('/add/employee', (req, res)=> {
   console.log(req.body);
   let newEmployee = new Employee({
      name: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          middleName: req.body.lastName
      },
      email: req.body.email,
      country: req.body.country,
      country_code: req.body.country_code,
      age: req.body.age,
      // joining date: job starts in a nice date format
      joining_date: req.body.joining_date,
      // employee register at
      created_at: Date.now(),
      spouse: req.body.spouse,
      department: '5c4622ef1c68c136b17f118b'
   });
   newEmployee.movie = ['Terminator', 'White Rabbit'];
   newEmployee.movie.push(req.body.movie);
   newEmployee.save();
   res.json(newEmployee);
});

router.get('/department', (req, res)=> {
   res.render('department');
});

router.post('/add/department', (req, res)=> {
   const newDept = new Department({
      name: req.body.name,
      address: {
         street: req.body.street,
         zip: req.body.zip,
         city: req.body.city
      }
   });
   newDept.save(err=> {
      if(err) throw err;
      res.send('dept added')
   })
});

// find employee by id and show populate for department
router.get('/employee', (req, res)=> {
   let id = '5c462528cd5c0d3766acd451';
   const query = Employee.findById(id);
   query.populate('department', '-_id');
   query.exec((err, result)=> {
      res.json(result);
   });
})

// add model school
const School = require('../models/school');
// new school
router.route('/school')
.get((req, res)=> {
   res.render('school');
})
.post((req, res)=> {
   console.log(req.body);
   const newSchool = new School({
      name: req.body.name,
      address: {
         street: req.body.street,
         zip: req.body.zip,
         city: req.body.city
      }
   });
   newSchool.save(err=> {
      //if(err) throw err;
      if(err) {
         res.json(err);
      }
      res.json('School is added....');
   })
});

// model student
const Student = require('../models/student');
// student routes
router.route('/student')
.get((req, res)=> {
   res.render('student')
})
.post((req, res)=> {
   const newStudent = new Student({
      name:req.body.name,
      age: req.body.age,
      course: req.body.course,
      school: '5c46ff7f97f158149d600a73'
   });
   newStudent.save((err, data)=> {
      if(err) {
         res.json(err)
      } else {
         res.json(data);
      }
   });
});

// find by id 
router.get('/find/student', (req, res)=> {
   // findByid
   const id = '5c471f5be382011e10c090e6' //micahel id
   const query = Student.findById(id);
   query.populate('school');// add all data of schools in this query
   query.exec((err, data) => {
      if(err) throw err;
      res.json(data);
   })
});

module.exports = router;
