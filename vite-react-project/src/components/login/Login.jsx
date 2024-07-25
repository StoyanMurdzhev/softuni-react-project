import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../services/userService";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const sumbitHandler = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await login(email, password);
            navigate("/");
        } catch (error) {
            if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
                setError("Incorrect email or password.");
            } else if (error.code === "auth/invalid-email") {
                setError("Invalid email address.");
            } else {
                setError("Error logging in.");
            }
            console.log(error);
            setPassword("");
        }
    }


    return (
        <>
            <form onSubmit={sumbitHandler}>
                <label htmlFor="email">
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label htmlFor="password">
                    Password:
                    <input type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </label>
                {error && <p style={{color: "red"}}>{error}</p>}
                <button type="submit">Log in</button>
            </form>
        </>
    )
}