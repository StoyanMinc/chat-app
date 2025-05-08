import { useEffect, useState } from "react";
import { post, get } from "../api/requester";
import { getAuthContext } from "../context/UserContext";

export const useCreateMessage = () => {
    const { socket } = getAuthContext();
    const createMessageHandler = async (messageData) => {
        const result = await post('/create-message', messageData);
    }
    return createMessageHandler;
}

export const useGetChatMessages = (userId, friendId) => {
    const { socket } = getAuthContext();

    const [chatMessages, setChatMessages] = useState([]);
    console.log('GET MESSAGES')

    useEffect(() => {
        (async () => {
            const result = await get(`/get-chat-messages?userId=${userId}&friendId=${friendId}`);
            setChatMessages(result);
        })();

        socket.connect();
        const roomId = [userId, friendId].sort().join('_');
        socket.emit('join_room', roomId);

        const handleReceiveMessage = (newMessage) => {
            setChatMessages(prevMessages => [...prevMessages, newMessage]);
        };
        socket.on('receive_message', handleReceiveMessage);
        return () => {
            socket.off("receive_message", handleReceiveMessage);
            socket.disconnect();
        };
    }, [friendId]);

    return chatMessages;
}