const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const teacherRouter = require('./routes/teacher');
// connecting mysql database
const sqlConnect = require('./config/mysqlConfig');

app.use(bodyParser.urlencoded({
    extended: false
}));

sqlConnect.connect(err=> {
    if(err) throw err;
    console.log('MYSQL Database successfully connected!');
    // sql query test 01
    //const sql = "CREATE TABLE students (name varchar(255), address varchar(255))";
    // SQL is a language
/*     const query = "CREATE TABLE teachers (name varchar(255), role varchar(255), email varchar(255), age int(10))";
    connection.query(query, err=> {
        if(err) throw err;
        console.log('Table created');
    }) */
    // sql test 02: primary create, ALTER for existing table
    //const sql = "ALTER TABLE students ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";
    // sql test 03: INSERT into to table: single value
    //const sql = "INSERT INTO students (name, address) VALUES ('Md Ariful Islam', 'Essen, Germany')";
 /*    connection.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
    }); */
    // sql test 04: INSERT into to table: MULTIPLE VALUES
/*     const sql = "INSERT INTO students (name, address) VALUES ?";
    let data = [
        ['Shoma', 'Highway 71'],
        ['Sumaiya', 'Lowstreet 4'],
        ['Shanta', 'Apple st 652'],
        ['Taslima', 'Mountain 21'],
        ['Michael', 'Valley 345']
    ];
    connection.query(sql, [data], (err, result)=>{
        if(err) throw err;
        console.log(result);
    }); */
    // sql test 05: Select data from table
    
});

// set the template engine views
app.set('view engine', 'hbs');

// set public folder for static files css, images
app.use(express.static(__dirname + '/public'));

//routes
app.use('', indexRouter);
app.use('/teacher', teacherRouter);
// any routes accepted for error handling
app.get('*', (req, res)=> {
    res.send('404, wrong place. please go to right path')
});

app.listen(PORT, ()=> {
    console.log('Start...Server is running successfully on port ' + PORT)
});