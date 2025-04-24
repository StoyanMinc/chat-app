import bcrypt from 'bcrypt';
import User from "../models/User.js";
import { deleteToken, generateToken } from "../utils/tokens.js";

import { logedUsers } from "../logedUsersDB.js";

export const register = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'This email is already used!' });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        console.log(hashedPassword)
        const result = await User.create({ email, username, password: hashedPassword });

        const userData = {
            email: result.email,
            username: result.username,
            token: generateToken(),
            timeStamp: new Date().getTime()
        };

        res.status(201).json(userData);
        logedUsers.push(userData);

    } catch (error) {
        console.log('[AUTH CONTROLLER REGISTER ERROR...]', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await User.findOne({ email });
        if (!result) {
            return res.status(404).json({ message: 'Invalid email or password' });
        }
        const isValidPassword = await bcrypt.compare(password, result.password);
        console.log(isValidPassword);
        if (!isValidPassword) {
            return res.status(404).json({ message: 'Invalid email or password' });
        }

        const userData = {
            email: result.email,
            username: result.username,
            token: generateToken(),
            timeStamp: new Date().getTime()
        };
        res.status(200).json(userData);
        logedUsers.push(userData);

    } catch (error) {
        console.log('[AUTH CONTROLLER LOGIN ERROR...]', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const logout = (req, res) => {
    const token = req.headers.token;
    deleteToken(token);
    res.status(200).json({ message: 'Logout successfuly!' });
};