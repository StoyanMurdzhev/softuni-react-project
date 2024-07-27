import deleteIcon from "../../assets/delete-icon.svg"

export default function DeleteButton() {
    return (
        <button className="flex items-center px-4 py-2 text-sm font-medium text-black transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 gap-x-3 hover:bg-gray-100">
                <img src={deleteIcon} alt="" className="w-5 h-5"/>
                <span>Delete Recipe</span>
            </button>
    )
}