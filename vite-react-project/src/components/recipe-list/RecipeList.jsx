import { useSearchParams } from "react-router-dom";
import { useRecipes } from "../../hooks/useRecipes";

import RecipeCard from "../recipe-card/RecipeCard";
import MealTypeButtons from "../buttons/MealTypeButtons";
import LoadingSpinner from "../spinner/LoadingSpinner";

export default function RecipeList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const mealTypeParam = searchParams.get("type");
    const pageSize = 6;

    const { recipes, loadRecipes, isLoadingInitial, isLoading, hasMoreRecipes, error } = useRecipes(mealTypeParam, pageSize);

    function handleFilter (mealType) {
        if (mealType) {
            setSearchParams({ type: mealType });
        } else {
            setSearchParams({});
        }
        loadRecipes(mealType, true);
    };

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

                <div className="flex justify-center mt-8">
                    <MealTypeButtons handleFilter={handleFilter} />
                </div>

                {error ? (
                    <p className="max-w-lg mx-auto mt-14 text-gray-500 text-center text-2xl">
                        {error.message}
                    </p>
                ) : isLoadingInitial ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
                            {recipes.map(recipe => (
                                <RecipeCard key={recipe.id} recipe={recipe} />
                            ))}
                        </div>
                        <div className="flex justify-center mt-8">
                            {isLoading ? (
                                <LoadingSpinner />
                            ) : (
                                hasMoreRecipes && (
                                    <button
                                        onClick={() => loadRecipes(mealTypeParam)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                        Load more recipes
                                    </button>
                                )
                            )}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}