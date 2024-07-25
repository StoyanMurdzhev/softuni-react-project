import { useState } from "react";
import { register } from "../../services/userService";
import { useNavigate } from "react-router-dom";


export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repass, setRepass] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function registerHandler(e) {
        e.preventDefault();

        if (password !== repass) {
            setError("Passwords do not match.");
            setRepass("");
            return;
        }

        try {
            await register(email, password);
            navigate("/");
        } catch (err) {
            setError(err.message);
            setPassword("");
            setRepass("");
        }
    }

    return (
        <>
            <form onSubmit={registerHandler}>
                <label htmlFor="email">
                    Email:
                    <input 
                    type="text"
                    name="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </label>
                <label htmlFor="password">
                    Password:
                    <input 
                    type="password" 
                    name="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </label>
                <label htmlFor="repass">
                    Confirm Password:
                    <input 
                    type="password" 
                    name="repass" 
                    value={repass}
                    onChange={(e) => setRepass(e.target.value)}
                    required
                    />
                </label>
                {error && <p>{error}</p>}
                <button type="submit">Register</button>
            </form>
        </>
    )
}