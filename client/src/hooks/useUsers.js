import { useEffect, useState } from "react";
// import { useNavigate } from 'react-router;'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { get } from "../api/requester";

export const useGetAllUsers = (userId) => {


    const [users, setUsers] = useState([]);

    useEffect(() => {

        get(`/get-users?exclude=${userId}`)
            .then(result => setUsers(result))
            .catch(error => {
                console.log(error);
                toast.error(error);
                navigate('/login');
            })
    }, []);

    return users;
}

export const useGetUser = (userId) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    if (!userId) {
        return
    }
    useEffect(() => {

        (async () => {
            try {
                const result = await get(`/get-user?userId=${userId}`);
                setUser(result);
            } catch (error) {
                toast.error('Invalid token');
                navigate('/login');
            }
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