/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { getMe } from "./services/auth.api";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => { 

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const publicPaths = new Set(["/", "/login", "/register"]);

        if (publicPaths.has(window.location.pathname)) {
            queueMicrotask(() => setLoading(false));
            return;
        }

        const getAndSetUser = async () => {
            try {
                const data = await getMe();

                if (data?.user) {
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        getAndSetUser();
    }, []);

    return (
        <AuthContext.Provider value={{user,setUser,loading,setLoading}} >
            {children}
        </AuthContext.Provider>
    )

    
}
