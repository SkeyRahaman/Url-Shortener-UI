import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthProvider';

/**
 * Wraps a route element and redirects to "/" (login) if the user is not authenticated.
 */
const ProtectedRoute = ({ children }) => {
    const { isLogin } = useAuth();
    if (!isLogin) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default ProtectedRoute;
