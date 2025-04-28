import { createContext, useContext, useState } from "react"

export const UserContext = createContext();

export default function UserProvider({ children }) {
    
    const [authState, setAuthState] = useState({
        authData: null,
        isAuth: false,
        changeAuthState: (authData, boolean) => setAuthState(prevState => ({...prevState, authData: authData, isAuth: boolean}))
    });
    
    return (
        <UserContext.Provider value={authState}>
            {children}
        </UserContext.Provider>
    )
}

export const getAuthContext = () => {
    const authData = useContext(UserContext);
    return authData;
};

