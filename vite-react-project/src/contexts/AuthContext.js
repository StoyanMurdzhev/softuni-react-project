import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { firebaseAuth } from "../firebase/firebase";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
        const [user, setUser] = useState(null);

        useEffect(() => {
            const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
              setUser(currentUser);
            });
            return () => unsubscribe();
          }, [auth]);

        const value = {
            currentUser
        }

        return (
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        )
}