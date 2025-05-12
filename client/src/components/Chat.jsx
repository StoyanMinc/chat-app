import { useEffect, useRef, useState } from "react";
import { useCreateMessage, useGetChatMessages } from "../hooks/useMessages";
import { useGetUser } from "../hooks/useUsers";
import { getAuthContext } from "../context/UserContext";

export default function Chat() {

    const { authData, chooseFriend } = getAuthContext();
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
    }, [messages]);

    const createMessageHandler = async () => {
        messageContent.senderId = authData.userId;
        messageContent.receiverId = authData.friendId;
        setMessageContent(prev => ({ ...prev, message: '', image: '' }))
        try {
            await createMessage(messageContent);
        } catch (error) {
            console.log(error);
        }
    }

    const onChangeHandler = (e) => {
        setMessageContent(prevState => ({ ...prevState, message: e.target.value }))
    }

    const onImageChangeHandler = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64Image = reader.result;
            setMessageContent(prev => ({ ...prev, image: base64Image }));
        }
    }

    const removeImage = () => {
        setMessageContent(prev => ({ ...prev, image: '' }));
    }

    const goBackHandler = () => {
        chooseFriend('', '');
    }

    return (
        <div className={`chat ${(authData.friendId) ? 'show-chat' : null}`}>
            <div className="go-back" onClick={goBackHandler}></div>
            <div className="chat-header">
                <div className="user-info">
                    <img src={friend.profilePic || "../assets/avatar.avif"} alt="user-image" />
                    <p className="chat-header-p">{friend.username}</p>
                    {authData.onlineUsers.includes(authData.friendId) && <div className="online"></div>}
                </div>
            </div>
            <div className="chat-body" ref={chatBodyRef}>
                {messages.map((message => {
                    return (
                        <div
                            key={message._id}
                            className={`message-container
                           ${(message.senderId._id === authData.userId || message.senderId === authData.userId) ? 'user' : 'friend'}`}
                        >
                            {/* {message.message && */}
                            <p className="text-message">
                                {`${(message.senderId._id === authData.userId || message.senderId === authData.userId) ? 'Me' : authData.friendUsername}: ${message.message}`}
                            </p>
                            {/* } */}
                            {/* {message.image && */}
                            {/* <div className="text-image-holder"> */}
                            {/* <img className="text-image">
                                        {`${(message.senderId._id === authData.userId || message.senderId === authData.userId) ? 'Me' : authData.friendUsername}:`}
                                    </p> */}
                            {message.image && <img className="sended-image" src={message.image} alt="image" />}
                            {/* </div> */}

                            {/* } */}

                        </div>
                    )
                }))}
                {messageContent.image &&
                    <div className="send-image-holder">
                        <div className="close-image" onClick={removeImage}></div>
                        <img className="image-preview" src={messageContent.image}></img>
                    </div>
                }
            </div>

            <div className="chat-messeging">
                <input
                    type="text"
                    placeholder="Write someting..."
                    onChange={onChangeHandler}
                    value={messageContent.message}
                />
                <label htmlFor="send-image">
                    <input
                        type="file"
                        id="send-image"
                        name="send-image"
                        className="input-send-image"
                        onChange={onImageChangeHandler}
                    />
                    <div className="send-image"></div>
                </label>
                <button className="send" onClick={createMessageHandler}></button>
            </div>

        </div>
    )
}