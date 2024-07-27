import { Link } from "react-router-dom";
import { convertTimestamp } from "../../services/recipeService";

export default function RecipeCard({ recipe }) {
    const datePublished = convertTimestamp(recipe);

    return (
        <div className="flex flex-col justify-between h-full p-4 overflow-hidden">
        <div>
            <Link to={`/recipes/${recipe.id}/details`}>
            <img
                className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                src={recipe.imageUrl}
                alt={recipe.name}
            />
            </Link>
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
                            Date published:
                        </Link>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {datePublished}
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
        </div>
    );
}