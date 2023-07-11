const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  suspended: { type: Boolean, default: false },
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
