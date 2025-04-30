const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
import getToken from "../utils/getToken";

async function requester(method, url, data) {
    // debugger;
    const token = getToken();
    
    const options = {
        method: method,
        headers: {}
    }

    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }
    if (token) {
        options.headers['token'] = token;
    }

    const response = await fetch(`${BASE_URL}${url}`, options);

    if (!response.ok) {
        const error = await response.json();
        if (error.code === 403) {
            localStorage.removeItem('auth');
        }
        throw new Error(error.message);
    }

    const result = await response.json();

    return result;
}

const get = (url) => requester('GET', url);
const post = (url, data) => requester('POST', url, data);
const put = (url, data) => requester('PUT', url, data);
const del = (url) => requester('DELETE', url);

export { get, post, put, del };