import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { convertTimestamp, getById } from "../../services/recipeService";

import RecipeActionButtons from "./RecipeActionButtons";

export default function RecipeDetails() {
    const { id } = useParams();
    const { user } = useAuth();
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                console.log(id);
                const fetchedRecipe = await getById(id);
                console.log(fetchedRecipe);
                setRecipe(fetchedRecipe);
            } catch (err) {
                setError(err.message);
            }
        })();
    }, [id]);

    if (!recipe) {
        return <p className="text-bold text-2xl">Loading...</p>
    }

    if (error) {
        return <p className="text-bold text-2xl">Error: {error}</p>
    }

    const isOwner = user && user.uid === recipe.ownerId;

    const datePublished = convertTimestamp(recipe);

    return (
        <article
            className="px-4 py-24 mx-auto max-w-7xl"
            itemID="#"
            itemScope=""
            itemType="http://schema.org/BlogPosting"
        >
            <div className="w-full mx-auto mb-12 text-left md:w-3/4 lg:w-1/2">
                <img
                    src={recipe.imageUrl}
                    className="object-cover w-full h-64 bg-center rounded-lg"
                    alt="Pizza Margherita"
                />
                <p className="mt-6 mb-2 text-xs font-semibold tracking-wider uppercase text-primary">
                    {recipe.mealType}
                </p>
                <h1
                    className="mb-3 text-3xl font-bold leading-tight text-gray-900 md:text-4xl"
                    itemProp="headline"
                    title={recipe.name}
                >
                    {recipe.name}
                </h1>
                <div className="flex mb-6 space-x-2">
                    {recipe.tags.map(tag => 
                        (
                        <Link to="/"
                            className="text-gray-900 bg-gray-100 badge hover:bg-gray-200"
                            key={tag}>
                            {tag}
                        </Link>
                        )
                    )}
                </div>
                <Link to="/" className="flex items-center text-gray-700">
                    {/* <div className="avatar">
                            <p className="text-sm font-semibold text-gray-800">Probably God</p>
                            <img src="/placeholder.jpg" alt="Couldn't find photo" />
                        </div> */}
                    <div className="ml-2">
                        <p className="text-sm text-gray-500">{datePublished}</p>
                    </div>
                </Link>
            </div>
            <div className="w-full mx-auto prose md:w-3/4 lg:w-1/2">
                <p>{recipe.description}</p>

                <p className="mt-10"> 
                    {recipe.instructions}
                </p>
            </div>
            {isOwner ? 
            <RecipeActionButtons />
            : 
            <span>Like button coming soon</span>
            }
        </article>
    )
}

