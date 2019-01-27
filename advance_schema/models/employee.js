const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name: {
        firstName: { 
            type: String, 
            required: [true, 'Please give FirstName']
        },
        lastName: { 
            type: String, 
            required: [true, 'Please give LastName']
        },
        middleName: { 
            type: String, 
            required: [true, 'Please give middleName']
        }
    },
    email: { type: String, unique: true },
    country: { type: String },
    country_code: { type: String, enum: ['de', 'en', 'sy', 'bd', 'ru']},
    age: { type: Number, min: 16, max: 70 },
    movie: [String],// array
    profile_pic: { type: String }, //req.file.filename use multer
    my_pics: [String],
    joining_date: Date,
    spouse: { type: String, lowercase: true, trim: true },
    gender: { type: Boolean, default: true },
    // the _id of department model
    department: { 
        type: Schema.Types.ObjectId, //some id from Department
        ref: 'Department'
    }
});

employeeSchema.virtual('fullName').get(function() {
    return this.name.firstName + ' ' + this.name.middleName + ' ' + this.name.lastName;
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;


