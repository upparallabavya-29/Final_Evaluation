import bcrypt from 'bcryptjs';
import { supabase } from '../config/supabaseClient.js';
import generateToken from '../utils/generateToken.js';

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const { data: existingUser } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const { data: newUser, error } = await supabase
            .from('users')
            .insert([
                {
                    name,
                    email,
                    password: hashedPassword,
                    balance: 10000,
                },
            ])
            .select()
            .single();

        if (error) throw error;

        res.status(201).json({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            balance: newUser.balance,
            token: generateToken(newUser.id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                balance: user.balance,
                token: generateToken(user.id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
