import { useState } from "react";
import { getAuthContext } from "../context/UserContext"
import { useLogout, useUpdateProfile } from "../hooks/useAuth";
import toast from "react-hot-toast";

export default function Profile() {
    const { authData } = getAuthContext();
    const [selectedImage, setSelectedImage] = useState(null);
    const logout = useLogout();
    const updateProfileHandler = useUpdateProfile();
    const logoutHandler = async () => {
        try {
            await logout();
        } catch (error) {
            console.log(error);
        }
    }

    const updateImageHandler = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async () => {
            try {
                const base64Image = reader.result;
                await updateProfileHandler(authData.userId, base64Image);
                setSelectedImage(base64Image);
                toast.success('Successfully upload profile image!')
            } catch (error) {
                console.log(error);
                toast.error('Cannot upload profile image!')
            }

        }
    }
    return (
        <div className="profile-container">
            <div className="profile-info">
                <div className="profile-image-wrapper">
                    <img
                        className="profile-img"
                        src={selectedImage || authData.profilePic || "./assets/avatar.avif"}
                    ></img>
                    <label htmlFor="change-image" className="change-image-label ">
                    <div className="change-image"></div>
                        <input
                            type="file"
                            name="change-image"
                            id="change-image"
                            className="change-image-input"
                            onChange={updateImageHandler} />

                    </label>
                </div>
                <p>{authData.username}</p>
            </div>
            <div className="logout" onClick={logoutHandler}></div>
        </div>
    )
}   