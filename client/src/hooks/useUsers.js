import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { get } from "../api/requester";

export const useGetAllUsers = (userId) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        get(`/get-users?exclude=${userId}`)
            .then(result => setUsers(result))
            .catch(err => {
                console.log(err);
                toast.error(err.message);
            })
    }, []);

    return users;
}

export const useGetUser = (userId) => {

    const [user, setUser] = useState({});
    if (!userId) {
        return
    }
    useEffect(() => {

        (async () => {
            const result = await get(`/get-user?userId=${userId}`);
            setUser(result);
        })();
    }, [userId]);
    return user;
}

//TODO check if this hook is needed...
export const useGetOnlineUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await get('/get-online-users');
            setUsers(result);

        })();
    }, []);

    return users;
}