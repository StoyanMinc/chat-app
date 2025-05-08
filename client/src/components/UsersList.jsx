import { getAuthContext } from "../context/UserContext";
import { useGetAllUsers } from "../hooks/useUsers"

export default function UsersList() {

    const { authData, chooseFriend } = getAuthContext();
    const users = useGetAllUsers(authData.userId);
    
    const selectFriendHandler = async (friendId, friendUsername) => {
        chooseFriend(friendId, friendUsername);
    }

    return (
        <div className="users-list">
            <ul>
                {users.length > 0
                    ? users.map((user) => {
                        return (
                            <li key={user._id} onClick={() => selectFriendHandler(user._id, user.username)} className={authData.friendId === user._id ? 'selected-friend' : null}>
                                <div className="user-info">
                                    <img src={user.profilePic || "../assets/avatar.avif" }alt="user-image" />
                                    <p>{user.username}</p>
                                   {authData.onlineUsers.includes(user._id) && <div className="green-dot"></div>}
                                </div>
                            </li>
                        )
                    })
                    : <p>No users found...</p>
                }
            </ul>
        </div>
    )
}