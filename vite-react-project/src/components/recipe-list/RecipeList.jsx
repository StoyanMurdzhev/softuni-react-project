import { useState, useEffect } from "react";
import { getAllWithPagination } from "../../services/recipeService";

import RecipeCard from "../recipe-card/RecipeCard";

export default function RecipeList() {

    const [recipes, setRecipes] = useState([]);
    const [lastVisible, setLastVisible] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMoreRecipes, setHasMoreRecipes] = useState(true);

    async function getMore() {
        const pageSize = 6;
        setIsLoading(true);
        console.log(lastVisible.name);
        const { recipes, lastVisibleRecipe } = await getAllWithPagination(lastVisible, pageSize);
        const nextRecipes = recipes.map(recipe => (
            {
                ...recipe.data(),
                id: recipe.id
            }
        )
)
        setRecipes(previousRecipes => [...previousRecipes, ...nextRecipes]);
        console.log(lastVisibleRecipe.name);
        setLastVisible(lastVisibleRecipe);
        setIsLoading(false);
        if (nextRecipes.length < 6) {
            setHasMoreRecipes(false);
        }
    }

    useEffect(() => {
        (async () => {
            console.log("Invocation");
            const pageSize = 7;
            const { recipes } =  await getAllWithPagination(null, pageSize);
            const nextRecipes = recipes.map(recipe => (
                    {
                        ...recipe.data(),
                        id: recipe.id
                    }
                ));
                if (recipes.length < 7) {
                setRecipes(nextRecipes);
                setHasMoreRecipes(false);
            } else {
                console.log(recipes.slice(0,6));
                setRecipes(recipes.slice(0, 6).map((recipe => (
                    {
                        ...recipe.data(),
                        id: recipe.id
                    }
                ))));
                setLastVisible(recipes[5]);
            }
        })();
    }, [])

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                        All Recipes
                    </h1>
                    <p className="max-w-lg mx-auto mt-4 text-gray-500">
                        Here you can browse all the recipes shared by our users!
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
                    {recipes.map(recipe => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                    {isLoading 
                    ? <p>Loading...</p> 
                    : hasMoreRecipes && <button onClick={() => getMore()}>Load more recipes</button>}
                </div>
            </div>
        </section>

    )
}