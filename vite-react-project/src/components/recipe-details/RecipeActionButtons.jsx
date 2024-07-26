import editIcon from "../../assets/edit-icon.svg"
import deleteIcon from "../../assets/delete-icon.svg"

export default function RecipeActionButtons() {
    return (
        <div className="inline-flex justify-items-center mt-10 max-w-sm bg-white border divide-x rounded-lg rtl:flex-row-reverse dark:bg-gray-900 dark:border-gray-700 dark:divide-gray-700">
            <button className="flex items-center px-4 py-2 text-sm font-medium text-black transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 gap-x-3 hover:bg-gray-100">
                <img src={editIcon} alt="" className="w-5 h-5"/>
                <span>Edit Recipe</span>
            </button>
            <button className="flex items-center px-4 py-2 text-sm font-medium text-black transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 gap-x-3 hover:bg-gray-100">
                <img src={deleteIcon} alt="" className="w-5 h-5"/>
                <span>Delete Recipe</span>
            </button>
        </div>

    );
}