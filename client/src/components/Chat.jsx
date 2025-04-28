export default function Chat() {
    const userMessege = 'Hello!';
    const friendMessage = 'Hello too!'
    return (
        <div className="chat">
            <div className="chat-header">
                <div className="user-info">
                    <img src="../assets/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.avif" alt="user-image" />
                    <p className="chat-header-p">Stoyan Minchev</p>
                    <div className="online"></div>
                </div>
            </div>

            <div className="chat-body">
                <p className="user-message">{`Me: ${userMessege}`}</p>
                <p className="friend-message">{`My Friend: ${friendMessage}`}</p>
            </div>

            <div className="chat-messeging">
                <input type="text" placeholder="Write someting" />
                <div className="sendfile"></div>
                <div className="send-photo"></div>
                <button className="send"></button>
            </div>
        </div>
    )
}