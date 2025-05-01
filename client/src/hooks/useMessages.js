import { useEffect, useState } from "react";
import { post, get } from "../api/requester";

export const useCreateMessage = () => {
    const createMessageHandler = async (messageData) => {
        const result = await post('/create-message', messageData);
        return result
    }

    return createMessageHandler;
}

export const useGetChatMessages = (userId, friendId) => {
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await get(`/get-chat-messages?userId=${userId}&friendId=${friendId}`);
            setChatMessages(result);
        })();
    }, [userId, friendId]);

    return chatMessages;
}