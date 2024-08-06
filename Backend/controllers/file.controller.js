import File from '../models/file.model.js';
import Class from '../models/class.model.js'; // Assuming you have a Class model
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

export const uploadMiddleware = upload.single('file');

export const uploadFile = async (req, res) => {
    const { classId } = req.body;
    const { originalname, path: filePath } = req.file;

    try {
        const newFile = new File({ fileName: originalname, filePath, classId });
        await newFile.save();

        const classDoc = await Class.findById(classId);
        if (!classDoc) {
            return res.status(404).json({ message: 'Class not found' });
        }

        classDoc.files.push(newFile._id);
        await classDoc.save();

        res.status(201).json(newFile);
    } catch (error) {
        res.status(500).json({ message: 'Error saving file information', error });
    }
};

export const getFilesByClass = async (req, res) => {
    const { classId } = req.params;
    try {
        const files = await File.find({ classId });
        res.json(files);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching files', error });
    }
};

export const downloadFile = async (req, res) => {
    const { fileId } = req.params;
    try {
        const file = await File.findById(fileId);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }
        res.download(path.resolve(file.filePath));
    } catch (error) {
        res.status(500).json({ message: 'Error downloading file', error });
    }
};
