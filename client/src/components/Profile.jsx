import { getAuthContext } from "../context/UserContext"

export default function Profile() {
    const { authData } = getAuthContext();
    console.log(authData);
    return (
        <div className="profile-container">
            <div className="profile-info">
                <div className="profile-img"></div>
                <p>{authData.email}</p>
            </div>
            <div className="edit-profile"></div>
        </div>
    )
}   