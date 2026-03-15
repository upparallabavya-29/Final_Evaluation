import { body, validationResult } from 'express-validator';
import accountService from '../services/accountService.js';

// Helper for handling validation results
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const getBalance = async (req, res, next) => {
    try {
        const balance = await accountService.getBalance(req.user);
        res.json({ balance });
    } catch (error) {
        next(error);
    }
};

export const getStatement = async (req, res, next) => {
    try {
        const transactions = await accountService.getStatement(req.user);
        res.json(transactions);
    } catch (error) {
        next(error);
    }
};

export const transferMoney = [
    body('receiverEmail').isEmail().withMessage('Enter a valid email'),
    body('amount').isFloat({ min: 1 }).withMessage('Amount must be at least 1'),
    validate,
    async (req, res, next) => {
        const { receiverEmail, amount } = req.body;
        try {
            const data = await accountService.transferMoney(req.user, receiverEmail, amount);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
];

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await accountService.getAllUsers(req.user);
        res.json(users);
    } catch (error) {
        next(error);
    }
};
