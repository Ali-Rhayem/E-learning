import express from "express";
import { createClass,getAllClasses,enrollStudent,getClassById } from "../controllers/class.controller.js";

const router = express.Router();

router.post("/create",createClass);
router.get("/getAll",getAllClasses);
router.post('/:classId/enroll', enrollStudent);
router.post('/:classId/getClass', getClassById);

export default router;
