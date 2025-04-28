import { Navigate, Outlet } from 'react-router-dom';

import { getAuthContext } from "../context/UserContext";

export default function AuthGuard() {
    const { isAuth } = getAuthContext();

    return isAuth
        ? <Outlet />
        : <Navigate to={'/login'} />
}