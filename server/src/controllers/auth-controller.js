import bcrypt from 'bcrypt';
import User from "../models/User.js";
import { generateToken } from "../utils/tokens.js";
import cloudinary from '../lib/cloudinary.js';
import { activeTokens, onlineUsers } from '../lib/socket.js';


//TODO LOG DEBBUG...

export const register = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'This email is already used!' });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ email, username, password: hashedPassword });

        const userData = {
            email: result.email,
            username: result.username,
            token: generateToken(),
            timeStamp: new Date().getTime()
        };

        res.status(201).json(userData);
        activeTokens.set(result._id, userData.token);
        console.log('[AUTH CONTROLLER] REGISTERED USER:', result);
    } catch (error) {
        console.log('[AUTH CONTROLLER] REGISTER ERROR...', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await User.findOne({ email });
        if (!result) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isValidPassword = await bcrypt.compare(password, result.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const userData = {
            email: result.email,
            username: result.username,
            userId: result._id,
            profilePic: result.profilePic,
            token: generateToken(),
            timeStamp: new Date().getTime()
        };
        res.status(200).json(userData);
        activeTokens.set(result._id.toString(), userData);
        console.log('[AUTH CONTROLLER] LOGGED USER:', result);
    } catch (error) {
        console.log('[AUTH CONTROLLER] LOGIN ERROR...', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//TODO fix logout token
export const logout = (req, res) => {
    const token = req.headers.token;
    for (const [userId, userData] of activeTokens) {
        if (token == userData.token) {
            activeTokens.delete(userId);
            break;
        }
    }
    res.status(200).json({ message: 'Logout successfuly!' });
    console.log('[AUTH CONTROLLER] LOGOUT USER');

};

export const updateProfile = async (req, res) => {
    const { userId } = req.query;
    try {
        const { profilePic } = req.body;
        if (!profilePic) {
            return res.status(400).json({ error: 'Profile picture is reqiured!' });
        }
        const uploadedPic = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadedPic.secure_url }, { new: true }).select('-password');
        res.status(200).json(updatedUser);
        console.log('[AUTH CONTROLLER] UPDATED USER:', updatedUser);
    } catch (error) {
        console.log('[AUTH CONTROLLER] UPDATE USER ERROR...', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};