import Chat from "./Chat";
import ChooseFriend from "./ChooseFriend";
import MenuBar from "./MenuBar";
import { getAuthContext } from "../context/UserContext";

export default function ChatPage() {

    const { authData } = getAuthContext();

    console.log(authData);
    return (
        <div className="chat-page">
            <MenuBar />
            {authData.friendId
                ? <Chat
                    userId={authData.userId}
                    friendId={authData.friendId}
                />
                : <ChooseFriend />}
        </div>
    )
}