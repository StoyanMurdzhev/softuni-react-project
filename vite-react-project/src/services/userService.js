import { auth } from "../firebase/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

async function login(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        throw error;
    }
}

export {
    login,
}