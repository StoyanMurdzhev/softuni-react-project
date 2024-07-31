import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { convertTimestamp, getById } from "../../services/recipeService";

import LikeButton from "../buttons/LikeButton";
import EditButton from "../buttons/EditButton";
import DeleteButton from "../buttons/DeleteButton";

export default function RecipeDetails() {
    const { id } = useParams();
    const { user } = useAuth();
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const fetchedRecipe = await getById(id);
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

    const recipeTimestamp = convertTimestamp(recipe);

    return (
        <article
            className="px-4 py-24 mx-auto max-w-7xl"
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
                <div className="flex mb-4 space-x-2">
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
                    <div>
                        <p className="text-sm text-gray-500">{recipe.editedOn ? "Last updated:" : "Date published:"} {recipeTimestamp}</p>
                    </div>
                </Link>
            </div>

            <div className="w-full mx-auto prose md:w-3/4 lg:w-1/2">

                <section>
                    <h2 className="font-bold text-2xl">Description</h2>
                    <p className="mt-3 text-lg">{recipe.description}</p>
                </section>

                <section>
                    <h2 className="mt-10 font-bold text-2xl">Ingredients</h2>
                    <ul className="list-disc mt-3 pl-5">
                        {recipe.ingredients.map(ingredient => (
                            <li key={ingredient} className="text-lg">{ingredient}</li>
                        ))}
                    </ul>
                </section>
                
                <section>
                    <h2 className="mt-10 font-bold text-2xl">Instructions:</h2>
                    <p className="mt-3 text-lg whitespace-pre-wrap">{recipe.instructions.join("\n\n")}</p>
                </section>

            </div>

            <div className="mt-10 w-300 flex justify-center items-center">

                {isOwner ?
                    (<>
                        <EditButton id={id} />
                        <DeleteButton id={id}/>
                    </>)
                    :
                    <LikeButton />
                }
            </div>
        </article>
    )
}

