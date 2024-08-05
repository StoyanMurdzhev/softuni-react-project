import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../services/userService';
import { useAuth } from '../../hooks/useAuth';

import homeIcon from "../../assets/home-icon.svg";
import DarkModeToggle from '../buttons/DarkModeToggle';

export default function Navbar() {

    const { user } = useAuth();
    const navigate = useNavigate();


    async function logoutHandler() {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            alert(`Error logging out: ${err.message}`);
        }
    }
    return ( 
        <nav className="px-6 py-4 shadow dark:bg-gray-900 dark:border-b-2">
            <div className="lg:items-center lg:justify-between lg:flex">
                <div className="flex items-center justify-between">
                    <Link to="/" className="mx-auto ">
                        <img
                            className="w-auto h-6 sm:h-7"
                            src={homeIcon}
                            alt=""
                        />
                    </Link>
                </div>
                <div className="absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white shadow-md lg:bg-transparent lg:dark:bg-transparent lg:shadow-none dark:bg-gray-900 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center">

                            <Link to="/recipes"
                                className="block px-3 py-2 text-gray-600 rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:text-gray-900 lg:mx-2"
                            >
                                Browse recipes
                            </Link>

                    {user ?

                        (<>
                            <Link to="/create"
                                className="block px-3 py-2 text-gray-600 rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:text-gray-900 lg:mx-2"
                            >
                                Post a recipe
                            </Link>
                            
                            <Link to="/my-recipes"
                                className="block px-3 py-2 text-gray-600 rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:text-gray-900 lg:mx-2"
                            >
                                My recipes
                            </Link>

                            <button
                                onClick={logoutHandler}
                                className="block px-3 py-2 text-gray-600 rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:text-gray-900 lg:mx-2">
                                Log out
                            </button>
                        </>)
                        :
                        (<>
                            <Link to="/login"
                                className="block px-3 py-2 text-gray-600 rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:text-gray-900 lg:mx-2"
                            >
                                Login
                            </Link>
                            <Link to="/register"
                                className="block px-3 py-2 text-gray-600 rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:text-gray-900 lg:mx-2"
                            >
                                Register
                            </Link>
                        </>)
                    }

                    <DarkModeToggle />
                </div>

            </div>
        </nav>
    )
};
