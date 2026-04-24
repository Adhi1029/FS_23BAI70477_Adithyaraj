const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// 1. Create: POST /api/students
router.post('/', async (req, res, next) => {
  try {
    const { name, email, course } = req.body;
    
    // Check if student with same email exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ success: false, error: 'Email already in use' });
    }

    const student = new Student({ name, email, course });
    const savedStudent = await student.save();
    
    res.status(201).json({ success: true, data: savedStudent });
  } catch (error) {
    next(error); // Pass to global error handler
  }
});

// 2. Read All: GET /api/students
router.get('/', async (req, res, next) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 }); // Newest first
    res.status(200).json({ success: true, count: students.length, data: students });
  } catch (error) {
    next(error);
  }
});

// 3. Read Single: GET /api/students/:id
router.get('/:id', async (req, res, next) => {
  try {
    const studentId = req.params.id;
    
    // Check for valid MongoDB ObjectId
    if (!studentId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ success: false, error: 'Invalid Student ID format' });
    }

    const student = await Student.findById(studentId);
    
    if (!student) {
      return res.status(404).json({ success: false, error: 'Student not found' });
    }
    
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    next(error);
  }
});

// 4. Update: PUT /api/students/:id
router.put('/:id', async (req, res, next) => {
  try {
    const studentId = req.params.id;

    if (!studentId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ success: false, error: 'Invalid Student ID format' });
    }

    // Use runValidators to ensure update adheres to schema rules
    const student = await Student.findByIdAndUpdate(
      studentId,
      req.body,
      { new: true, runValidators: true } 
    );

    if (!student) {
      return res.status(404).json({ success: false, error: 'Student not found to update' });
    }

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    next(error);
  }
});

// 5. Delete: DELETE /api/students/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const studentId = req.params.id;

    if (!studentId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ success: false, error: 'Invalid Student ID format' });
    }

    const student = await Student.findByIdAndDelete(studentId);

    if (!student) {
      return res.status(404).json({ success: false, error: 'Student not found to delete' });
    }

    res.status(200).json({ success: true, message: 'Student successfully deleted', data: {} });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
