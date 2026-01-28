import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import type { JSX } from 'react';

const AdminProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { user, isLoggedIn } = useAuth();

    // Check if the user has the required role
    const hasAccess = user?.role === "SUPER_USER" || user?.role === "ADMIN";
    

    if (!isLoggedIn || !hasAccess) {
        console.warn("Access denied: Not an admin");
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminProtectedRoute;