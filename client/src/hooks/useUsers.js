import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { post, get } from "../api/requester";


export const useGetAllUsers = (userId) => {
    const [users, setUsers] = useState([]);


    useEffect(() => {

        if(!userId) return;
        
        get(`/get-users?exclude=${userId}`)
            .then(result => setUsers(result))
            .catch(err => {
                console.log(err);
                toast.error(err.message);
            })
    }, []);

    return users;
}