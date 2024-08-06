import express from "express";
import { createClass,getAllClasses,enrollStudent,getClassById,getStudentsByClass } from "../controllers/class.controller.js";

const router = express.Router();

router.post("/create",createClass);
router.get("/getAll",getAllClasses);
router.post('/:classId/enroll', enrollStudent);
router.post('/:classId/getClass', getClassById);
router.get('/:classId/students', getStudentsByClass);

export default router;
