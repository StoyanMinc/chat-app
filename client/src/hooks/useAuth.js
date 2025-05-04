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
        console.log(result);
        socket.emit('user_is_login', result.userId);
        return result;
    }
    return loginHandler;
}

//TODO update logout functionality
export const useLogout = () => {
    const {authData, socket} = getAuthContext();
    const { updateAuthData } = getAuthContext();

    const logoutHandler = async () => {

        await get('/logout');
        localStorage.removeItem('auth');
        updateAuthData(null, false);
        socket.emit('logout_user', authData.userId);
    }

    return logoutHandler;
}