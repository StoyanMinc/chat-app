import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from 'socket.io-client';
const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL

export const UserContext = createContext();

export default function UserProvider({ children }) {

    const [authData, setAuthData] = useState({
        username: '',
        email: '',
        token: '',
        isAuth: false,
        friendId: '',
        friendUsername: '',
        isConnected: false,
        onlineUsers: [],
    });

    const socketRef = useRef(null);


    useEffect(() => {
        // Initialize socket with autoConnect: false
        socketRef.current = io(BASE_URL, {
            // autoConnect: false, // Prevent auto-connect before login
        });

        socketRef.current.on("connect", () => {
            setAuthData(prev => ({ ...prev, isConnected: true }));
        });

        socketRef.current.on('update_online_users', (userIds) => {
            setAuthData(prev => ({ ...prev, onlineUsers: userIds }));
        })

        socketRef.current.on("disconnect", () => {
            setAuthData(prev => ({ ...prev, isConnected: false }));
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const updateAuthData = (authData, boolean) => setAuthData(prev => ({
        ...prev,
        ...authData,
        isAuth: boolean
    }))
    const chooseFriend = (friendId, friendUsername) => setAuthData(prev => ({ ...prev, friendId, friendUsername }));

    const contextData = {
        authData,
        updateAuthData,
        chooseFriend,
        socket: socketRef.current
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

