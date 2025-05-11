import { io } from "../lib/socket.js";
import cloudinary from '../lib/cloudinary.js';

import Message from "../models/Message.js";

//TODO LOG DEBBUG...

export const createMessage = async (req, res) => {
    const messageData = req.body;
    try {
        if(messageData.image) {
            const uploadedPic = await cloudinary.uploader.upload(messageData.image);
            messageData.image = uploadedPic.secure_url;
        }
        const result = await Message.create(messageData);
        res.status(201).json(result);
        console.log('[MESSAGE CONTROLLER] CREATE MESSAGE');
        const roomId = [result.senderId.toString(), result.receiverId.toString()].sort().join('_');
        console.log('SERVER CREATE MESSAGE:', result, roomId);
        // ✅ Emit the message to the room
        io.to(roomId).emit('receive_message', result);

    } catch (error) {
        console.log('[MESSAGE CONTROLLER] ERROR CREATE MESSAGE', error);
        res.status(400).json({ error: error });
    }
};

export const getChatMessages = async (req, res) => {
    const { userId, friendId } = req.query;
    try {
        const result = await Message.find({
            $or: [
                { senderId: userId, receiverId: friendId },
                { senderId: friendId, receiverId: userId },
            ]
        })
            .populate('senderId', 'username')
            .populate('receiverId', 'username');
        res.status(200).json(result);
        console.log('[MESSAGE CONTROLLER] SEND MESSAGES');
    } catch (error) {
        console.log('[MESSAGE CONTROLLER] ERROR SEND MESSAGES', error);
        res.status(400).json({ error: error })
    }
};