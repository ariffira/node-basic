const express = require("express");
const app = express();
const PORT = 5001;
const faker = require("faker");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/aggTest');

const User = require('./models/user');


//routes for test

app.get('/', (req, res)=> {
   res.json({ title: "my site works"});
});

app.post('/add', (req, res) => {
   // add data to database
    let newUser = new User({
        name: faker.name.findName(),
        username: faker.name.firstName(),
        email: faker.internet.email(),
        address: faker.address.streetAddress(),
        bio: faker.lorem.sentence(),
        image: faker.image.avatar(),
        website: 'www.arif.com',
        phone: faker.phone.phoneNumber(),
        salary: faker.random.number(),
    });

    newUser.save(err => {
        if(err) throw err;
        res.json(newUser);
    });
});

// aggregate data
// find people with same website name
app.get('/search', (req, res) => {
    let query = User.aggregate([
        {
            $match: {
                "website": "www.arif.com"
            }
        },
        {
            $group: {
                _id: "$role",
                count: {
                    $sum: 1
                }
            }
        }
    ]);
    query.exec(function (err, result) {
        if(err) throw err;
        console.log(result);
        res.json(result);
    });
});

app.listen(PORT, ()=> {
    console.log("Server is running on port number" + PORT);
});



