import { Navigate, Outlet } from 'react-router-dom';

import { getAuthContext } from "../context/UserContext";

export default function AuthGuard() {
    const { authData } = getAuthContext();
    console.log(authData);

    return authData.isAuth
        ? <Outlet />
        : <Navigate to={'/login'} />
}