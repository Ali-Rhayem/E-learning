import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
    fileName: { type: String, required: true },
    filePath: { type: String, required: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
});

const File = mongoose.model('File', FileSchema);

export default File;
