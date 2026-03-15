import express from 'express';
import { getBalance, getStatement, transferMoney, getAllUsers } from '../controllers/accountController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/balance', protect, getBalance);
router.get('/statement', protect, getStatement);
router.post('/transfer', protect, transferMoney);
router.get('/users', protect, getAllUsers);

export default router;
