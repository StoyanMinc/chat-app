import Chat from "./Chat";
import FriendProfile from "./FriendProfile";
import MenuBar from "./MenuBar";

export default function ChatPage() {
    return (
        <div className="chat-page">
            <MenuBar />
            <Chat />
            <FriendProfile />
        </div>
    )
}