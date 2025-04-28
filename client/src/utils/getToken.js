export default function getToken() {
    const authData = localStorage.getItem('auth');
    if(authData) {
        return authData.token;
    }
}