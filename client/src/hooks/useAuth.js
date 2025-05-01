import { post, get } from "../api/requester";
import { getAuthContext } from "../context/UserContext"

export const useRegister = () => {
    const { changeAuthState } = getAuthContext();
    const registerHandler = async (email, username, password) => {
        const result = await post('/register', { email, username, password });
        changeAuthState(result, true);
        localStorage.setItem('auth', JSON.stringify(result));
        return result;
    }
    return registerHandler;
}

export const useLogin = () => {
    const { updateAuthData} = getAuthContext();

    const loginHandler = async (email, password) => {
        const result = await post('/login', { email, password });
        updateAuthData(result, true);
        localStorage.setItem('auth', JSON.stringify(result));
        return result;
    }
    return loginHandler;
}

export const useLogout = () => {
    const { updateAuthData } = getAuthContext();

    const logoutHandler = async () => {
        
        await get('/logout');
        localStorage.removeItem('auth');
        updateAuthData(null, false);
    }

    return logoutHandler;
}