import { useEffect, useState } from "react";
import { register } from "../../services/userService";
import { Link, useNavigate } from "react-router-dom";


export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repass, setRepass] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        if (errors.password) {
            setPassword("");
            setRepass("");
        }
        if(errors.repass) {
            setRepass("");
        }
    }, [errors]);

    async function submitHandler(e) {
        e.preventDefault();
        setErrors({});
        
        try {
            await register(email, password, repass);
            navigate("/");
        } catch (err) {
            setErrors(err);
        }
    }

    return (

        <>
            <section className="bg-white dark:bg-gray-900">
                <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
                    <form onSubmit={submitHandler} className="w-full max-w-md">

                        <div className="flex items-center justify-center mt-6">
                            <Link to="/login"
                                className="w-1/3 pb-4 font-medium text-center text-gray-500 border-b dark:border-gray-400 dark:text-gray-300"
                            >
                                Sign In
                            </Link>
                            <span
                                className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white"
                            >
                                Sign Up
                            </span>
                        </div>
                        
                       
                        <div className="relative flex items-center mt-6">
                            <span className="absolute">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </span>
                            <input
                                type="email"
                                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setErrors({});
                                }}
                                placeholder="Email address"
                                autoComplete="off"
                            />
                            
                        </div>
                            {errors.email && <p className="text-red-500">{errors.email}</p>}


                        <div className="relative flex items-center mt-4">
                            <span className="absolute">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                            </span>
                            <input
                                type="password"
                                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setErrors({});
                                }}
                                placeholder="Enter password"
                            />
                        </div>
                            {errors.password && <p className="text-red-500">{errors.password}</p>}


                        <div className="relative flex items-center mt-4">
                            <span className="absolute">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                            </span>
                            <input
                                type="password"
                                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                id="repass"
                                name="repass"
                                value={repass}
                                onChange={(e) => {
                                    setRepass(e.target.value);
                                    setErrors({});
                                }}
                                placeholder="Confirm password"
                                autoComplete="off"
                            />
                        </div>
                            {errors.repass && <p className="text-red-500">{errors.repass}</p>}

                            {errors.missingFields && <p className="text-red-500 mt-2">{errors.missingFields}</p>}

                        <div className="mt-6">
                            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                Sign Up
                            </button>
                            <div className="mt-6 text-center">
                                <Link 
                                    to="/login"
                                    className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                                >
                                    Already have an account? Sign in
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </section>

        </>
    )
}