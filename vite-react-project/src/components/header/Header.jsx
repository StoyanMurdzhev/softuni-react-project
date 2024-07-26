import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../services/userService';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {

    const { user } = useAuth();
    const navigate = useNavigate();


    async function logoutHandler() {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.log(error);
            // to do: implement better error handling
        }
    }
    return (
        <nav className="px-6 py-4 shadow">
            <div className="lg:items-center lg:justify-between lg:flex">
                <div className="flex items-center justify-between">
                    <Link to="/" className="mx-auto ">
                        <img
                            className="w-auto h-6 sm:h-7"
                            src="https://firebasestorage.googleapis.com/v0/b/softuni-react-spa-project.appspot.com/o/home_2550369.png?alt=media&token=cffe9db7-9a2f-4531-9067-49852d6a0007"
                            alt=""
                        />
                    </Link>
                </div>
                <div className="absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white shadow-md lg:bg-transparent lg:dark:bg-transparent lg:shadow-none dark:bg-gray-900 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center">

                    {user ?

                        (<>
                            <Link to="/create"
                                className="block px-3 py-2 text-gray-600 rounded-lg dark:text-gray-200 hover:bg-gray-100 lg:mx-2"
                            >
                                Post a recipe
                            </Link>

                            <button
                                onClick={logoutHandler}
                                className="block px-3 py-2 text-gray-600 rounded-lg dark:text-gray-200 hover:bg-gray-100 lg:mx-2">
                                Log out
                            </button>
                        </>)
                        :
                        (<>
                            <Link to="/login"
                                className="block px-3 py-2 text-gray-600 rounded-lg dark:text-gray-200 hover:bg-gray-100 lg:mx-2"
                            >
                                Login
                            </Link>
                            <Link to="/register"
                                className="block px-3 py-2 text-gray-600 rounded-lg dark:text-gray-200 hover:bg-gray-100 lg:mx-2"
                            >
                                Register
                            </Link>
                        </>)
                    }
                </div>

            </div>
        </nav>
    )
};
