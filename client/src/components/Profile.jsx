import { getAuthContext } from "../context/UserContext"
import { useLogout } from "../hooks/useAuth";

export default function Profile() {
    const { authData } = getAuthContext();
    const logout = useLogout();

    const logoutHandler = async () => {
        try {
            await logout();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="profile-container">
            <div className="profile-info">
                <img className="profile-img" src="./assets/avatar.avif"></img>
                <p>{authData.username}</p>
                <label htmlFor="change-image">
                    {/* <img src="" alt="profile-image" className="change-image" /> */}
                    <div className="change-image"></div>
                    <input type="file" name="change-image" id="change-image" className="change-image-input"/>
                </label>
            </div>
            <div className="logout" onClick={logoutHandler}></div>
        </div>
    )
}   