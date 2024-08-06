import express from 'express';
import { uploadFile, getFilesByClass, downloadFile, uploadMiddleware } from '../controllers/file.controller.js';

const router = express.Router();

router.post('/upload', uploadMiddleware, uploadFile);
router.get('/class/:classId', getFilesByClass);
router.get('/download/:fileId', downloadFile);

export default router;
