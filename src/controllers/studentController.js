const { validationResult } = require('express-validator');
const Student = require('../models/Student');

const suspendStudent = async (req, res) => {
  try {
    const { student } = req.body;

    const studentObj = await Student.findOneAndUpdate(
      { email: student },
      { suspended: true },
      { new: true }
    );

    if (!studentObj) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  suspendStudent,
};
