import WithdrawalRequest from "../models/withdrawalRequest.model.js";
import Class from '../models/class.model.js';
import User from '../models/user.model.js';

export const createWithdrawalRequest = async (req, res) => {
    const { userId, classId } = req.body;
    try {
        const Request = new WithdrawalRequest({ userId, classId });
        await Request.save();
        res.status(201).json(Request);
    } catch (e) {
        res.status(500).json({ message: "Error creating request", e });
    }
};

export const getWithdrawalRequestsByClass = async (req, res) => {
    const { classId } = req.params;
    try {
        const requests = await WithdrawalRequest.find({ classId }).populate('userId').populate('classId');
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching withdrawal requests', error });
    }
};

export const updateWithdrawalRequest = async (req, res) => {
    const { requestId } = req.params;
    const { status } = req.body;
    try {
        const request = await WithdrawalRequest.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: 'Withdrawal request not found' });
        }

        if (status === 'approved') {
            const classToUpdate = await Class.findById(request.classId);
            const student = await User.findById(request.userId);

            if (!classToUpdate) {
                return res.status(404).json({ message: "Class not found" });
            }

            if (!student) {
                return res.status(404).json({ message: "Student not found" });
            }

            classToUpdate.students = classToUpdate.students.filter(id => id.toString() !== request.userId.toString());
            await classToUpdate.save();

            student.enrolledClasses = student.enrolledClasses.filter(id => id.toString() !== request.classId.toString());
            await student.save();

            await WithdrawalRequest.findByIdAndDelete(requestId);
            res.status(200).json({ message: 'Withdrawal request approved and deleted' });
        } else {
            request.status = status;
            request.responseDate = Date.now();
            await request.save();
            res.json(request);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating withdrawal request', error });
    }
};

export const getAllWithdrawalRequests = async (req, res) => {
    try {
        const requests = await WithdrawalRequest.find().populate('userId').populate('classId');
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching all withdrawal requests', error });
    }
};
