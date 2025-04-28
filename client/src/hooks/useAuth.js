import { post } from "../api/requester";
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
    const { changeAuthState } = getAuthContext();
    const loginHandler = async (username, password) => {
        const result = await post('/login', { username, password });
        changeAuthState(result, true);
        console.log(result)
        localStorage.setItem('auth', JSON.stringify(result));
        return result;
    }
    return loginHandler;
}