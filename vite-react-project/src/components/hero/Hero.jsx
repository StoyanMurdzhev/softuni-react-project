import { Link } from "react-router-dom";

export default function Hero() {
    return (
                <div className="lg:flex">
                    <div className="flex items-center justify-center w-full px-6 py-8 lg:h-[32rem] lg:w-1/2">
                        <div className="max-w-xl">
                            <h2 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
                                TheCookBook
                            </h2>
                            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 lg:text-base">
                                Discover and share deliciours recipes!
                            </p>
                            <div className="flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row">
                                <Link to="/recipes"
                                    className="block px-5 py-2 text-sm font-medium tracking-wider text-center text-white transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-gray-700"
                                >
                                    Browse Recipes
                                </Link>
                                <Link to="/register"
                                    className="block px-5 py-2 text-sm font-medium tracking-wider text-center text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md lg:mx-4 hover:bg-gray-300"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-64 lg:w-1/2 lg:h-auto">
                        <div
                            className="w-full h-full bg-cover"
                            style={{
                                backgroundImage:
                                    "url(https://firebasestorage.googleapis.com/v0/b/softuni-react-spa-project.appspot.com/o/Kitchen_and_ingredient_digital_drawing_doodle.jpg?alt=media&token=96630ef6-db18-4513-a722-0abda9b57b54)"
                            }}
                        >
                        </div>
                    </div>
                </div>
    )
}