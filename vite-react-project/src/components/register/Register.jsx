import { useState } from "react";
import { register } from "../../services/userService";
import { Link, useNavigate } from "react-router-dom";


export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repass, setRepass] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function submitHandler(e) {
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
            <section className="px-4 pb-24 mx-auto max-w-7xl">
                <div className="w-full py-6 mx-auto md:w-3/5 lg:w-2/5">
                    <h1 className="mb-1 text-xl font-medium text-center text-gray-800 md:text-3xl">
                        Create your Free Account
                    </h1>
                    <p className="mb-2 text-sm font-normal text-center text-gray-700 md:text-base">
                        It's time to cook.
                    </p>
                    <form onSubmit={submitHandler} className="mt-8 space-y-4">
                        <label htmlFor="email" className="block">
                            <span className="block mb-1 text-xs font-medium text-gray-700">
                                Email
                            </span>
                            <input
                                className="form-input"
                                type="text"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                        <label htmlFor="password" className="block">
                            <span className="block mb-1 text-xs font-medium text-gray-700">
                                Password
                            </span>
                            <input
                                className="form-input"
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                        <label htmlFor="repass" className="block">
                            <span className="block mb-1 text-xs font-medium text-gray-700">
                                Repeat password
                            </span>
                            <input
                                className="form-input"
                                type="password"
                                id="repass"
                                name="repass"
                                value={repass}
                                onChange={(e) => setRepass(e.target.value)}
                                required
                            />
                        </label>
                        <button
                            type="submit"
                            className="w-full btn btn-primary btn-lg"
                        >
                            Sign up
                        </button>
                    </form>
                    {error && <p className="text-red">{error}</p> }
                    <p className="mt-4 mb-2 text-sm font-normal text-center text-gray-700 md:text-base">
                        Already have an account?
                        <Link to={"/login"} className="ml-3 text-purple-700 hover:text-purple-900">
                            Sign in
                        </Link>
                    </p>
                </div>
            </section>
        </>
    )
}