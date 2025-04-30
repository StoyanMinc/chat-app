import mongoose, { Mongoose, Types } from "mongoose";

const messageSchema = new mongoose.Schema({
    message: {
        type: String
    },
    image: {
        type: String
    },
    senderId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiverId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {timestamps: true});

const Message = mongoose.model('Message', messageSchema);

export default Message;