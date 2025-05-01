import Message from "../models/Message.js";

export const createMessage = async (req, res) => {
  const messageData = req.body;
  console.log(messageData)
    try {
        const result = await Message.create(messageData);
        console.log(result);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};