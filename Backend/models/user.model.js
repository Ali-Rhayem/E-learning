import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    enrolledClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }] // Ensure this is correct
});

const User = mongoose.model('User', UserSchema);
export default User;
