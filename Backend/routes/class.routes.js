import express from "express";
import {
    createClass,
    getAllClasses,
    enrollStudent,
    getClassById,
    getStudentsByClass,
    getClassesByStudentId,
    removeStudent
} from "../controllers/class.controller.js";

const router = express.Router();

router.post("/create", createClass);
router.get("/getAll", getAllClasses);
router.post('/:classId/enroll', enrollStudent);
router.post('/:classId/getClass', getClassById);
router.get('/:classId/students', getStudentsByClass);
router.get('/student/:studentId/classes', getClassesByStudentId); 
router.delete('/:classId/student/:studentId', removeStudent); 

export default router;
