import mongoose from 'mongoose';

const WithdrawalRequestSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    requestDate: { type: Date, default: Date.now },
    responseDate: { type: Date },
});

const WithdrawalRequest = mongoose.model('WithdrawalRequest', WithdrawalRequestSchema);

export default WithdrawalRequest;
