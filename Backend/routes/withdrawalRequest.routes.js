import express from "express";
import { createWithdrawalRequest,getWithdrawalRequestsByClass,updateWithdrawalRequest } from "../controllers/withdrawalRequest.controller.js";

const router = express.Router();

router.post('/create',createWithdrawalRequest);
router.get('/class/:classId',getWithdrawalRequestsByClass);
router.put('/:requestId',updateWithdrawalRequest);

export default router;