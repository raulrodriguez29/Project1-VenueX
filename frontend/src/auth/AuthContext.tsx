import React, { createContext, useContext, useState } from 'react';
import { logoutUser } from '../api/auth.api';
import type { User } from '../types/User.ts';

interface AuthContextType {
    isLoggedIn: boolean;
    user: User | null; 
    login: (userData: User) => void; 
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Initialize user from localStorage in one shot
    const [user, setUser] = useState<User | null>(() => {
        const id = localStorage.getItem('id');
        const token = localStorage.getItem('token');
        
        if (!id || !token) return null;

        return {
            id: Number(id),
            email: localStorage.getItem('email') || '',
            role: localStorage.getItem('role') || '',
            firstName: localStorage.getItem('firstName') || '',
            lastName: localStorage.getItem('lastName') || '',
            phone: localStorage.getItem('phone') || '',
        };
    });

    // Derived State: If we have a user object, they are logged in.
    // This prevents "sync" bugs where one state updates but the other doesn't.
    const isLoggedIn = !!user;

    const login = (userData: User) => {
        // Note: The localStorage.setItems already happened in auth.api.ts
        setUser(userData);
    };

    const logout = () => {
        logoutUser();    // Clears localStorage via your api helper
        setUser(null);   // Updates the UI instantly
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};