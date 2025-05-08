import { onlineUsers } from "../lib/socket.js";

export const authMiddleware = async (req, res, next) => {

    const token = req.headers.token;
    if (!token) {
        return res.status(403).json({ error: 'Token is required!' })
    }

    let userIsLogged = false;
    for (const [userId, userData] of onlineUsers) {
        if (userData.token === token) {
            userIsLogged = true;
            break;
        }
    }
    // const userIsLogged = onlineUsers.find(user => user.token === token);
    if (!userIsLogged) {
        console.log(userIsLogged);

        return res.status(403).json({ error: 'Invalid token!' })
    }
    next();
}