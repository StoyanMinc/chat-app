import Message from "../models/Message.js";

export const createMessage = async (req, res) => {
    const { senderId,
        receiverId,
        message,
        image } = req.body;
    try {
        const result = await Message.create({
            senderId, receiverId, message, image
        });
        console.log(result);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};