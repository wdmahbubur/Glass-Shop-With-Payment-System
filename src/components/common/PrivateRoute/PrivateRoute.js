import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import Loading from '../Loading/Loading';

function RequireAuth({ children }) {
    const { user, loading } = useAuth();
    let location = useLocation();
    if (loading) { return <Loading /> }
    if (!user?.email) {
        return <Navigate to="/sign-in" state={{ from: location }} />
    }
    return children;
};

export default RequireAuth;