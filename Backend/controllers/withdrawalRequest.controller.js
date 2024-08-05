import WithdrawalRequest from "../models/withdrawalRequest.model.js";

export const createWithdrawalRequest = async (req,res)=>{
    const {userId,classId} = req.body;
    try{
        const Request = new WithdrawalRequest({userId,classId});
        await Request.save();
        res.status(201).json(Request);
    }catch(e){
        res.status(500).json({message:"Error creating request",e})
    }
}

export const getWithdrawalRequestsByClass = async (req, res) => {
    const { classId } = req.params;
    try {
        const requests = await WithdrawalRequest.find({ classId });
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching withdrawal requests', error });
    }
};

export const updateWithdrawalRequest = async (req,res)=>{
    const { requestId } = req.params;
    const { status } = req.body;
    try{
        const Request = await WithdrawalRequest.findById(requestId);
        if (!Request) {
            return res.status(404).json({ message: 'Withdrawal request not found' });
        }

        Request.status = status;
        Request.requestDate = Date.now();
        await Request.save();
        res.json(Request);
    }catch(e){
        res.status(500).json({ message: 'Error updating withdrawal request', error });
    }
}