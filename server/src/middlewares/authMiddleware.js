// import { logedUsers } from "../logedUsersDB.js";

// export const authMiddleware = async (req, res, next) => {

//     const token  = req.headers.token;
//     if (!token) {
//         return res.status(403).json({ message: 'Token is required!' })
//     }

//     const userIsLoged = logedUsers.find(user => user.token === token);
//     if(!userIsLoged) {
//         return res.status(403).json({ message: 'Invalid token!' })
//     }
    
//     next();
// }