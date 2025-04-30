import { getAuthContext } from "../context/UserContext"
import { useLogout } from "../hooks/useAuth";

export default function Profile() {
    const { authData } = getAuthContext();
    const logout = useLogout();

    const logoutHandler = async () => {
        await logout();
    }

    return (
        <div className="profile-container">
            <div className="profile-info">
                <div className="profile-img"></div>
                <p>{authData.username}</p>
                <div className="change-picture"></div>
            </div>
                <div className="logout" onClick={logoutHandler}></div>
        </div>
    )
}   