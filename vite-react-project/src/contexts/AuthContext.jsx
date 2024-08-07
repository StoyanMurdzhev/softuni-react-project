import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase.js";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
        const [user, setUser] = useState(null);
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
              setUser(currentUser);
              setIsLoading(false);
            });
            return () => unsubscribe();
          }, []);

        const value = {
            user,
            isLoading
        };

        return (
            <AuthContext.Provider value={value}>
                {!isLoading && children}
            </AuthContext.Provider>
        )
}