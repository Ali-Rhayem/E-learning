import express from 'express';
import { uploadFile, getFilesByClass, downloadFile } from '../controllers/file.controller.js';
import upload from '../controllers/file.controller.js';

const router = express.Router();

router.post('/upload', upload.single('file'), uploadFile);
router.get('/class/:classId', getFilesByClass);
router.get('/:fileId/download', downloadFile);

export default router;
