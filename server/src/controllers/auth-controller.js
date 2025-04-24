import User from "../models/User.js";
import { generateToken } from "../utils/tokens.js";

import { logedUsers } from "../logedUsersDB.js";

export const register = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if(existingUser) {
           return res.status(400).json({message: 'This email is already used!'})
        }
        const result = await User.create({ email, username, password });
        
        const userData = {
            email: result.email,
            username: result.username,
            token: generateToken(),
            timeStamp: new Date().getTime() 
        };

        res.status(201).json(userData);
        logedUsers.push(userData);

    } catch (error) {
        console.log('[AUTH CONTROLLER ERROR...]', error);
        res.status(500).json({ message: 'Internal server error'});
    }
};