import { auth } from "../firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

async function login(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        
        if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found" || error.code === "auth/invalid-credential") {
            throw new Error("Incorrect email or password.");
        } else if (error.code === "auth/invalid-email") {
            throw new Error("Please enter a valid email address.");
        } else {
            throw new Error("Error logging in. Please try again later.");
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

async function register(email, password, repass) {
    const errors = {};
    if (!email || !password || !repass) {
        errors.missingFields = "Please make sure all fields are filled in.";
        throw errors;
    }

    if (password && password.length < 6) {
        errors.password = "Password should be at least six characters long.";
    }
    
    if (password !== repass) {
            errors.repass = "Passwords do not match.";
        }
    
    if (Object.keys(errors).length != 0) {
        throw errors;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {

        if (error.code === "auth/invalid-email") {
            errors.email = "Please enter a valid email address.";
        } else if (error.code === "auth/email-already-in-use") {
            errors.email= "This email is already in use.";
        } else {
            errors.msg = "Error creating an account. Please try again later.";
        }

        throw errors;
        
    }
}

export {
    login,
    logout,
    register
}