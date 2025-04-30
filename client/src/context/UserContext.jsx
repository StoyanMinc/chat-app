import { createContext, useContext, useState } from "react"

export const UserContext = createContext();

export default function UserProvider({ children }) {

    const [authData, setAuthData] = useState({
        username: '',
        email: '',
        token: '',
        isAuth: false,
        friendId: ''
    });

    const updateAuthData = (authData, boolean) => setAuthData(prev => ({
        ...prev,
        ...authData,
        isAuth: boolean
    }))
    const chooseFriend = (friendId) => setAuthData(prev => ({ ...prev, friendId }));

    const contextData = {
        authData,
        updateAuthData,
        chooseFriend
    }
    
    return (
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    )
}

export const getAuthContext = () => {
    const authData = useContext(UserContext);
    return authData;
};

