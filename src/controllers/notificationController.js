const { validationResult } = require('express-validator');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');

const retrieveRecipients = async (req, res) => {
  try {
    const { teacher, notification } = req.body;

    const mentionedStudents = notification.match(/@([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)/g);
    const mentionedEmails = mentionedStudents ? mentionedStudents.map((student) => student.substring(1)) : [];

    const teacherObj = await Teacher.findOne({ email: teacher });

    if (!teacherObj) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const recipients = await Student.find({
      $and: [
        { teachers: { $in: teacherObj._id } },
        { suspended: false },
        {
          $or: [{ email: { $in: mentionedEmails } }, { teachers: { $in: teacherObj._id } }],
        },
      ],
    }).distinct('email');

    res.status(200).json({ recipients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  retrieveRecipients,
};
