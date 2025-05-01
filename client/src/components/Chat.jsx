import { useState } from "react";
import { useCreateMessage, useGetChatMessages } from "../hooks/useMessages";
import { useGetUser } from "../hooks/useUsers";

export default function Chat({ userId, friendId }) {

    const createMessage = useCreateMessage();
    const friend = useGetUser(friendId);
    const messages = useGetChatMessages(userId, friendId);

    const [messageContent, setMessageContent] = useState({
        senderId: '',
        receiverId: '',
        message: '',
        image: ''
    });

    const createMessageHandler = async () => {
        messageContent.senderId = authData.userId;
        messageContent.receiverId = authData.friendId;
        try {
            await createMessage(messageContent);
        } catch (error) {
            console.log(error);
        }
    }

    const onChangeHandler = (e) => {
        setMessageContent(prevState => ({ ...prevState, message: e.target.value }))
    }

    return (
        <div className="chat">
            <div className="chat-header">
                <div className="user-info">
                    <img src="../assets/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.avif" alt="user-image" />
                    <p className="chat-header-p">{friend.username}</p>
                    <div className="online"></div>
                </div>
            </div>
            <div className="chat-body">
                {messages.map((message => {
                    return (
                        <div key={message._id} className={`message-container ${message.senderId._id === userId ? 'user' : 'friend'}`}>
                            <p className="text-message">{`${message.senderId._id === userId ? 'Me' : message.senderId.username}: ${message.message}`}</p>
                        </div>
                    )
                }))}
            </div>

            <div className="chat-messeging">
                <input
                    type="text"
                    placeholder="Write someting"
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