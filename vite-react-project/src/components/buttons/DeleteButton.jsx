import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { deleteRecipe } from "../../services/recipeService"

import deleteIcon from "../../assets/delete-icon.svg"
import Modal from "../modal/Modal";

export default function DeleteButton({ id }) {
    const [isModalOpen, setIsModalOpen] = useState(false);


    const navigate = useNavigate();

    async function deleteHandler(id) {
        try {
            await deleteRecipe(id);
            navigate("/my-recipes");
        } catch (error) {
            alert(`Error deleting recipe: ${err.message}`);
        }
    }

    return (
        <>
            <button onClick={() => setIsModalOpen(true)} className="flex items-center px-4 py-2 text-sm font-medium text-black transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 gap-x-3 hover:bg-gray-100">
                <img src={deleteIcon} alt="deleteIcon" className="w-5 h-5" />
                <span>Delete Recipe</span>
            </button>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={() => deleteHandler(id)} />
        </>
    )
}