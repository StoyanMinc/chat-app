import { v4 as uuidv4 } from 'uuid';

import { logedUsers } from '../logedUsersDB.js';

export function generateToken() {
    const token = uuidv4();
    return token;
}

export function validateToken(token) {

    let user = logedUsers.find(u => u.token === token);
    if (!user) {
        return false
    }
    user.timeStamp = new Date().getTime();
    return true;
}

export function clearTokens() {
    setInterval(() => {
        let timeStamp = new Date().getTime();
        for (let i = 0; i < logedUsers.length; i++) {
            if (timeStamp - logedUsers[i].timeStamp > 300000) {
                logedUsers.splice(i, 1);
            }
        }
    }, 60000);
}