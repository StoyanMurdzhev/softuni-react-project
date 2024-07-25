import { auth } from "../firebase/firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

async function login(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        
        console.log(error.message);
        
        if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found" || error.code === "auth/invalid-credential") {
            throw new Error("Incorrect email or password.");
        } else if (error.code === "auth/invalid-email") {
            throw new Error("Please enter a valid email address.");
        } else {
            throw new Error("Error logging in.");
        }
        
    }
}

async function logout() {
    try {
        await signOut(auth);
    } catch (error) {
        throw error;
    }
}

async function register(email, password) {
    try {
        await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
        if (error.code === "auth/weak-password") {
            throw new Error("Password should be at least 6 characters long.");
        } else if (error.code === "auth/invalid-email") {
            throw new Error("Please enter a valid email address.");
        } else if (error.code === "auth/email-already-in-use") {
            throw new Error("This email is already in use.");
        } else {
            throw new Error("Error creating an account.");
        }
    }
}

export {
    login,
    logout,
    register
}