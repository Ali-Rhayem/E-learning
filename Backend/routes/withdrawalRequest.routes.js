import express from "express";
import { createWithdrawalRequest, getWithdrawalRequestsByClass, updateWithdrawalRequest, getAllWithdrawalRequests } from "../controllers/withdrawalRequest.controller.js";

const router = express.Router();

router.post('/create', createWithdrawalRequest);
router.get('/class/:classId', getWithdrawalRequestsByClass);
router.put('/:requestId', updateWithdrawalRequest);
router.get('/getAll', getAllWithdrawalRequests); 

export default router;
