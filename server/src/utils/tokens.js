import { v4 as uuidv4 } from 'uuid';
import { activeTokens } from '../lib/socket.js';


export function generateToken() {
    const token = uuidv4();
    return token;
}

export function validateToken(token) {

    let user = onlineUsers.find(u => u.token === token);
    if (!user) {
        return false
    }
    user.timeStamp = new Date().getTime();
    return true;
}

export function clearTokens() {
    setInterval(() => {
        let timeStamp = new Date().getTime();
        for (const [userId, userData] of activeTokens) {
            if (timeStamp - userData.timeStamp > 300000) {
                activeTokens.delete(userId);
            }
        };
        console.log(activeTokens);
    }, 60000);
}

// export function deleteToken(token) {
//     for (let i = logedUsers.length -1 ; i > -1; i--) {
//         if (logedUsers[i].token === token) {
//             logedUsers.splice(i, 1);
//         }
//     };
// }