const { validationResult } = require('express-validator');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');

const registerStudents = async (req, res) => {
  try {
    const { teacher, students } = req.body;

    const teacherObj = await Teacher.findOneAndUpdate(
      { email: teacher },
      { email: teacher },
      { upsert: true, new: true }
    );

    const studentObjects = await Promise.all(
      students.map(async (student) => {
        const studentObj = await Student.findOneAndUpdate(
          { email: student },
          { email: student },
          { upsert: true, new: true }
        );

        teacherObj.students.addToSet(studentObj._id);
        studentObj.teachers.addToSet(teacherObj._id);
        await studentObj.save();

        return studentObj;
      })
    );

    await teacherObj.save();

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  registerStudents,
};
