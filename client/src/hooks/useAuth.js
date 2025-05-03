import { post, get } from "../api/requester";
import { getAuthContext } from "../context/UserContext"

export const useRegister = () => {
    const { updateAuthData, socket } = getAuthContext();
    const registerHandler = async (email, username, password) => {
        const result = await post('/register', { email, username, password });
        updateAuthData(result, true);
        localStorage.setItem('auth', JSON.stringify(result));
        return result;
    }
    return registerHandler;
}

export const useLogin = () => {
    const { updateAuthData, socket } = getAuthContext();

    const loginHandler = async (email, password) => {
        const result = await post('/login', { email, password });
        updateAuthData(result, true);
        localStorage.setItem('auth', JSON.stringify(result));
        // After successful login, connect socket and notify server of online status
        if (socket && !socket.connected) {
            socket.connect();
        }

        // socket.emit('user-online', {
        //     username: result.username,
        //     userId: result.id,
        // });
        return result;
    }
    return loginHandler;
}

export const useLogout = () => {
    const { updateAuthData, socket } = getAuthContext();

    const logoutHandler = async () => {

        await get('/logout');
        localStorage.removeItem('auth');
        updateAuthData(null, false);
        if (socket && socket.connected) {
            socket.disconnect();
        }   
    }

    return logoutHandler;
}