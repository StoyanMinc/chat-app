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
                            <li key={user._id} onClick={() => selectFriendHandler(user._id, user.username)}>
                                <div className="user-info">
                                    <img src="../assets/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.avif" alt="user-image" />
                                    <p>{user.username}</p>
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