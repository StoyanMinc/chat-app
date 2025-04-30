import { post, get } from "../api/requester";

export const useCreateMessage = () => {
    const createMessageHandler = async (messageData) => {
        const result = await post('/create-message', messageData);
        return result
    }

    return createMessageHandler;
}