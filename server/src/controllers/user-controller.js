import { onlineUsers } from "../lib/socket.js";
import User from "../models/User.js";

//TODO LOG DEBBUG...

export const getAllUsers = async (req, res) => {
    const userId = req.query.exclude;
    try {
        const users = await User.find({ _id: { $ne: userId } }).select('-password');
        res.status(200).json(users);
    } catch (error) {
        console.log('[USER CONTROLLER GET USERS ERROR...]', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getOneUser = async (req, res) => {
    const id = req.query.userId;

    try {
        const result = await User.findById(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

export const getOnlineUsers = (req, res) => {
  const users = Array.from(onlineUsers.keys());
  res.status(200).json(users);  
};