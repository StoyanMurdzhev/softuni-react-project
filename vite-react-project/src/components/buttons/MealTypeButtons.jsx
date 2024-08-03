import { mealTypes } from "../../constants";


export default function MealTypeButtons({ handleFilter }) {

    function clickHandler(type) {
        handleFilter(type);
    }

    return (
        <div className="inline-flex bg-white border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:divide-gray-700">
            
            <button onClick={() => clickHandler(null)} key={"all"} className="px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
                All
            </button>

            {mealTypes.map(type => (
                <button onClick={() => clickHandler(type)} key={type} className="px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
                    {type}
                </button>
            ))}

        </div>
    );
}