import { useState } from "react";
import LikeIcon from "../../assets/like-icon.svg"
import { likeRecipe } from "../../services/recipeService"

export default function LikeButton({ id, userId, onLike }) {
    const [error, setError] = useState("");

    async function clickHandler(id, userId) {
        try {
            await likeRecipe(id, userId);
            onLike();
        } catch (err) {
            setError(err.message);
        }
    }

    return(
        <>
        <button onClick={() => clickHandler(id, userId)} className="flex items-center px-4 py-2 text-sm font-medium text-black transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 gap-x-3 hover:bg-gray-100">
              <img src={LikeIcon} alt="" className="w-5 h-5"/>
              <span>Like</span>
        </button>
        {error && <p className="text-red-500">{error}</p>}
        </>

    )
}