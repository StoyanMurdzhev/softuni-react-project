import React, { useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { firebaseAuth } from "../firebase/firebase";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
        const [currentUser, setCurrentUser] = useState(null);
        const [isLoggedIn, setIsLoggedIn] = useState(false);
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            const unsubscribe = onAuthStateChanged(firebaseAuth, initializeUser);
            return unsubscribe;
        }, [])

        async function initializeUser(user) {
            if (user) {
                // spreading the user object's properties to remove reference
                setCurrentUser({ ...user });
                setIsLoggedIn(true);
            } else {
                setCurrentUser(null);
                setIsLoggedIn(false);
            }
            setIsLoading(false);
        }

        const value = {
            currentUser,
            isLoggedIn,
            isLoading
        }

        return (
            <AuthContext.Provider value={value}>
                {!isLoading && children}
            </AuthContext.Provider>
        )
}