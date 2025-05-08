import { useEffect, useRef, useState } from "react";
import { useCreateMessage, useGetChatMessages } from "../hooks/useMessages";
import { useGetUser } from "../hooks/useUsers";
import { getAuthContext } from "../context/UserContext";

export default function Chat() {

    const { authData } = getAuthContext();
    const createMessage = useCreateMessage();
    const friend = useGetUser(authData.friendId);
    const messages = useGetChatMessages(authData.userId, authData.friendId);
    const [messageContent, setMessageContent] = useState({
        senderId: '',
        receiverId: '',
        message: '',
        image: ''
    });

    const chatBodyRef = useRef(null);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTo({
                top: chatBodyRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    },[messages]);

    const createMessageHandler = async () => {
        messageContent.senderId = authData.userId;
        messageContent.receiverId = authData.friendId;
        setMessageContent(prev => ({ ...prev, message: '' }))
        try {
            await createMessage(messageContent);
        } catch (error) {
            console.log(error);
        }
    }

    const onChangeHandler = (e) => {
        setMessageContent(prevState => ({ ...prevState, message: e.target.value }))
    }

    const onFileChangeHandler = (e) => {

    }

    return (
        <div className="chat">
            <div className="chat-header">
                <div className="user-info">
                    <img src="../assets/avatar.avif" alt="user-image" />
                    <p className="chat-header-p">{friend.username}</p>
                    {authData.onlineUsers.includes(authData.friendId) && <div className="online"></div>}
                </div>
            </div>
            <div className="chat-body" ref={chatBodyRef}>
                {messages.map((message => {
                    return (
                        <div key={message._id} className={`message-container ${(message.senderId._id === authData.userId || message.senderId === authData.userId) ? 'user' : 'friend'}`}>
                            <p className="text-message">{`${(message.senderId._id === authData.userId || message.senderId === authData.userId) ? 'Me' : authData.friendUsername}: ${message.message}`}</p>
                        </div>
                    )
                }))}
            </div>

            <div className="chat-messeging">
                <input
                    type="text"
                    placeholder="Write someting..."
                    onChange={onChangeHandler}
                    value={messageContent.message}
                />

                <div className="sendfile"></div>
                <div className="send-photo"></div>
                <button className="send" onClick={createMessageHandler}></button>
            </div>

        </div>
    )
}