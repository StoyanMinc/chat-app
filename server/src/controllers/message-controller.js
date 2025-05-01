import Message from "../models/Message.js";

//TODO LOG DEBBUG...

export const createMessage = async (req, res) => {
    const messageData = req.body;
    try {
        const result = await Message.create(messageData);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

export const getChatMessages = async (req, res) => {
    const { userId, friendId } = req.query;
    console.log(userId, friendId);
    try {
        const result = await Message.find({
            $or: [
                { senderId: userId, receiverId: friendId },
                { senderId: friendId, receiverId: userId },
            ]
        })
        .populate('senderId', 'username')
        .populate('receiverId', 'username');
        console.log(result)
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: error})
    }
};