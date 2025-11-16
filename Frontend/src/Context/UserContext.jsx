// src/Context/UserContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ✅ Check for token and fetch user when app starts
    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Backend should verify the token stored in cookies
                const res = await axios.get("http://localhost:3000/api/auth/me", {
                    withCredentials: true,
                });
                setUser(res.data.user);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook for easy access
export const useUser = () => useContext(UserContext);
