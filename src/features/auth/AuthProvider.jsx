import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../users/api';

// ─── Context ────────────────────────────────────────────────────────────────
export const AuthContext = createContext(null);

// ─── Provider ───────────────────────────────────────────────────────────────
export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(() => !!localStorage.getItem('token'));
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    });

    // On mount: if a token exists, refresh real user data from the API
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getCurrentUser()
                .then((userData) => {
                    const enriched = {
                        id: userData.id,
                        username: userData.user_name,
                        email: userData.email,
                    };
                    setUser(enriched);
                    localStorage.setItem('user', JSON.stringify(enriched));
                    setIsLogin(true);
                })
                .catch(() => {
                    // Token is invalid / expired — clear everything
                    logout();
                });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const login = (token, userData) => {
        localStorage.setItem('token', token);
        const enriched = {
            id: userData.id,
            username: userData.username,
            email: userData.email,
        };
        localStorage.setItem('user', JSON.stringify(enriched));
        setUser(enriched);
        setIsLogin(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsLogin(false);
    };

    // Called from Profile page after a successful PUT /users/me
    const updateUser = (updatedFields) => {
        const merged = { ...user, ...updatedFields };
        localStorage.setItem('user', JSON.stringify(merged));
        setUser(merged);
    };

    return (
        <AuthContext.Provider value={{ isLogin, user, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// ─── Hook ────────────────────────────────────────────────────────────────────
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
    return ctx;
};
