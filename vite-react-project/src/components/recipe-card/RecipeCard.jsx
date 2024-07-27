import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
    return (
        <div>
            <img
                className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                src={recipe.imageUrl}
                alt={recipe.name}
            />
            <div className="mt-8">
                <span className="text-blue-500 text-xs font-bold uppercase">{recipe.mealType}</span>
                <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                    {recipe.name}
                </h1>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                    {recipe.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                    <div>
                        <Link to="/"
                            className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:underline hover:text-gray-500"
                        >
                            Author name should be here
                        </Link>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {recipe.ownerId}
                        </p>
                    </div>
                    <Link to={`/recipes/${recipe.id}/details`}
                        className="inline-block text-blue-500 underline hover:text-blue-400"
                    >
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
}