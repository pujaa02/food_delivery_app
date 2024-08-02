import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { State_user } from '../Types/reducer';
import { ProtectedRouteProps } from '../Types/protectedroute';

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
    const location = useLocation();
    const user = useSelector((state: State_user) => state.user);
    if (!user?.id) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return <Component />
};

export const CheckUser: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
    const user = useSelector((state: State_user) => state.user);
    return (user?.id) ? <Navigate to="/" /> : <Component />;
}



