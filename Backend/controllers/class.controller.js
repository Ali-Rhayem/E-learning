import Class from '../models/class.model.js';
import User from '../models/user.model.js';

export const createClass = async (req, res) => {
    const { title, description, files } = req.body;
    try {
        const newClass = new Class({ title, description, files, students: [] });
        await newClass.save();
        res.status(201).json(newClass);
    } catch (e) {
        res.status(500).json({ message: "error creating class", e });
    }
};

export const getAllClasses = async (req, res) => {
    try {
        const classes = await Class.find().populate('students');
        res.status(200).json(classes);
    } catch (e) {
        res.status(500).json({ message: "error getting classes", e });
    }
};

export const enrollStudent = async (req, res) => {
    const { classId } = req.params;
    const { studentId } = req.body;

    try {
        const classToEnroll = await Class.findById(classId);
        const student = await User.findById(studentId);

        if (!classToEnroll) {
            return res.status(404).json({ message: "Class not found" });
        }

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        if (classToEnroll.students.includes(studentId)) {
            return res.status(400).json({ message: "Student already enrolled" });
        }

        classToEnroll.students.push(studentId);
        await classToEnroll.save();

        student.enrolledClasses.push(classId);
        await student.save();

        res.status(200).json(classToEnroll);
    } catch (e) {
        res.status(500).json({ message: "error adding student", e });
    }
};

export const getClassById = async (req, res) => {
    const { classId } = req.params;
    try {
        const classDetails = await Class.findById(classId);
        if (!classDetails) {
            return res.status(404).json({ message: "Class Not Found" });
        }
        res.status(200).json(classDetails);
    } catch (e) {
        res.status(500).json({ message: "Error fetching class", e });
    }
};

export const getStudentsByClass = async (req, res) => {
    const { classId } = req.params;
    try {
        const classDetails = await Class.findById(classId).populate('students');
        if (!classDetails) {
            return res.status(404).json({ message: "Class Not Found" });
        }
        res.status(200).json(classDetails.students);
    } catch (e) {
        res.status(500).json({ message: "Error fetching students", e });
    }
};

export const getClassesByStudentId = async (req, res) => {
    const { studentId } = req.params;
    try {
        const student = await User.findById(studentId).populate('enrolledClasses');
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json(student.enrolledClasses);
    } catch (e) {
        res.status(500).json({ message: "Error fetching classes", e });
    }
};
