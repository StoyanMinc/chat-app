export default function getToken() {
    const authData = JSON.parse(localStorage.getItem('auth'));
    if(authData) {
        return authData.token;
    }
}