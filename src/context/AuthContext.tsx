// src/context/auth/AuthProvider.tsx

import React, { createContext, useEffect, useState } from "react";
import type { AuthContextType, User } from "../types/auth/tokenAuth";
import { decodeToken, getToken, isTokenExpired, removeToken, setToken } from "../utils/token/tokenUtils";
;


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User>(null);

    const login = (token: string) => {
        setToken(token);
        const decodedUser = decodeToken(token);
        if (decodedUser) setUser(decodedUser);
    };

    const logout = () => {
        removeToken();
        setUser(null);
    };
    useEffect(() => {
        const token = getToken();
        if (token && !isTokenExpired(token)) {
            const decodedUser = decodeToken(token);

            if (decodedUser) {
                setUser(decodedUser);
                const expireTime = decodedUser.exp * 1000 - Date.now();
                if (expireTime > 0) {
                    const timer = setTimeout(() => {
                        logout();
                    }, expireTime);
                    return () => clearTimeout(timer);
                } else {
                    logout();
                }
            } else {
                logout();
            }
        } else {
            logout();
        }
    }, []);



    // 🔹 auto logout when token expires
    useEffect(() => {
        if (!user) return;

        const token = getToken();
        if (!token) return;

        const decoded = decodeToken(token);
        if (!decoded?.exp) return;

        const expireTime = decoded.exp * 1000 - Date.now();
        if (expireTime <= 0) {
            logout();
            return;
        }

        const timer = setTimeout(() => {
            logout();
        }, expireTime);

        return () => clearTimeout(timer);
    }, [user]);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
