import { useState, useEffect } from "react";
import { getWithPagination } from "../services/recipeService";

export function useRecipes(initialMealType, pageSize) {
    const [recipes, setRecipes] = useState([]);
    const [lastVisible, setLastVisible] = useState(null);
    const [isLoadingInitial, setIsLoadingInitial] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMoreRecipes, setHasMoreRecipes] = useState(true);
    const [error, setError] = useState(null);

    async function loadRecipes (mealType, hasNewFilter = false) {
        if (hasNewFilter) {
            setIsLoadingInitial(true);
        }
        setIsLoading(true);
        setError(null);
        try {
            const { recipes, lastVisibleRecipe, isLastBatch } = await getWithPagination(
                hasNewFilter ? null : lastVisible,
                pageSize,
                mealType
            );

            const fetchedRecipes = recipes.map(recipe => ({
                ...recipe.data(),
                id: recipe.id
            }));

            if (hasNewFilter) {
                setRecipes(fetchedRecipes);
            } else {
                setRecipes(prev => [...prev, ...fetchedRecipes]);
            }

            setLastVisible(lastVisibleRecipe);
            setHasMoreRecipes(!isLastBatch);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoadingInitial(false);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoadingInitial(true);
        loadRecipes(initialMealType, true);
    }, [initialMealType]);

    return { recipes, loadRecipes, isLoadingInitial, isLoading, hasMoreRecipes, error };
}
