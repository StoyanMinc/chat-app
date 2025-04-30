import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
    const userId = req.query.exclude;
    try {
        const users = await User.find({_id: { $ne: userId }}).select('-password');
        res.status(200).json(users);
    } catch (error) {
        console.log('[USER CONTROLLER GET USERS ERROR...]', error);
        res.status(500).json({ message: 'Internal server error' });    }
}

export const getOneUser = async (req, res) => {
    const id = req.query.id;
    
    console.log(id);

    res.send('ok');
};