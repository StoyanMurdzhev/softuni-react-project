import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../services/userService";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function sumbitHandler(e) {
        e.preventDefault();
        setError("");

        try {
            await login(email, password);
            navigate("/");
        } catch (err) {
            console.log(err.message);
            setError(err.message);
            setPassword("");
        }
    }


    return (
        <>
            <form onSubmit={sumbitHandler}>
                <label htmlFor="email">
                    Email:
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label htmlFor="password">
                    Password:
                    <input type="password"
                        id="password"
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