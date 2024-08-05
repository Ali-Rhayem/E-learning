import mongoose from 'mongoose';

const ClassSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    files: [String],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Class = mongoose.model('Class', ClassSchema);

export default Class;
