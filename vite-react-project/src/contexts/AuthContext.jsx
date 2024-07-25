import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase/firebase.js";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
        const [user, setUser] = useState(null);

        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
              setUser(currentUser);
            });
            return () => unsubscribe();
          }, []);

        const value = {
            user
        }

        return (
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        )
}