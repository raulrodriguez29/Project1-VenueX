import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import type { JSX } from 'react';

const AdminProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { user, isLoggedIn } = useAuth();

    // Check if the user has the required role
    const isAdmin = user?.role === "ROLE_ADMIN" || user?.role === "ADMIN";

    if (!isLoggedIn || !isAdmin) {
        console.warn("Access denied: Not an admin");
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminProtectedRoute;