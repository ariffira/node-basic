const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: { type:String, required: [true, 'Please give School Name!']},
    age: { type: Number, min: 25, max: 65 },
    course: { type: String, enum: ['FBW1', 'FBW2', 'FBW3', 'FBW4']},
    school: {
        type: Schema.Types.ObjectId,
        ref: 'School'
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;