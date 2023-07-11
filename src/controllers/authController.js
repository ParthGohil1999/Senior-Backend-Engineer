const Teacher = require('../models/Teacher');
const Student = require('../models/Student');

// Register students to a teacher
const registerStudents = async (req, res, next) => {
  try {
    const { teacher, students } = req.body;

    // Find or create the teacher
    let teacherObj = await Teacher.findOne({ email: teacher });
    if (!teacherObj) {
      teacherObj = await Teacher.create({ email: teacher });
    }

    // Find or create the students and add them to the teacher's student list
    for (const studentEmail of students) {
      let studentObj = await Student.findOne({ email: studentEmail });
      if (!studentObj) {
        studentObj = await Student.create({ email: studentEmail });
      }
      if (!teacherObj.students.includes(studentObj._id)) {
        teacherObj.students.push(studentObj._id);
      }
    }

    await teacherObj.save();

    return res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
};

// Retrieve common students for a list of teachers
const getCommonStudents = async (req, res, next) => {
  try {
    const { teacher } = req.query;

    // Find all teachers
    const teachers = Array.isArray(teacher) ? teacher : [teacher];

    // Find students registered to all teachers
    const commonStudents = await Student.find({ teachers: { $all: teachers } }).select('email');

    return res.status(200).json({ students: commonStudents.map((student) => student.email) });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  registerStudents,
  getCommonStudents,
};
