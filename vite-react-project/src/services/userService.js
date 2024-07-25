import { auth } from "../firebase/firebase.js";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

async function login(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        throw error;
    }
}

async function logout() {
    try {
        await signOut(auth);
    } catch (error) {
        throw error;
    }
}

export {
    login,
    logout
}