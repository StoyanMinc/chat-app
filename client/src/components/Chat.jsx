import { useState } from "react";
import { useCreateMessage } from "../hooks/useMessages";
import { getAuthContext } from "../context/UserContext";

export default function Chat() {
    const { authData } = getAuthContext();
    const createMessage = useCreateMessage();

    const [messageContent, setMessageContent] = useState({
        sendeId: '',
        receiverId: '',
        message: '',
        image: ''
    });

    const userMessege = 'Hello!';
    const friendMessage = 'Hello too!'

    const createMessageHandler = async () => {
           messageContent.sendeId = authData.userId;
           messageContent.receiverId = authData.friendId;
        try {
            const result = await createMessage(messageContent);
            // console.log(result);
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
                    <p className="chat-header-p">Stoyan Minchev</p>
                    <div className="online"></div>
                </div>
            </div>

            {authData.friendId ? (<div className="chat-body">
                <div className="message-container user">
                    <p className="text-message">{`Me: ${userMessege}`}</p>
                </div>
                <div className="message-container friend">
                    <p className="text-message">{`My Friend: ${friendMessage}`}</p>
                </div>
            </div>)
                : (<div className="choose-friend-container">
                    <p>Choose friend to chat</p>
                </div>)
            }

            {authData.friendId &&
                (<div className="chat-messeging">
                    <input
                        type="text"
                        placeholder="Write someting"
                        onChange={onChangeHandler}
                        value={messageContent.message}
                    />

                    <div className="sendfile"></div>
                    <div className="send-photo"></div>
                    <button className="send" onClick={createMessageHandler}></button>
                </div>)
            }

        </div>
    )
}