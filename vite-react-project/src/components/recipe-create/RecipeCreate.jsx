export default function RecipeCreate() {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
                <form className="w-full max-w-md">
                    {/* logo */}
                    {/* <div className="flex justify-center mx-auto">
                        <img
                            className="w-auto h-7 sm:h-8"
                            src="https://merakiui.com/images/logo.svg"
                            alt=""
                        />
                    </div> */}
                    {/* end logo */}
                    <div className="flex items-center justify-center">
                        <p>Post a recipe:</p>
                    </div>
                    <div className="mt-8">
                        <label htmlFor="dish">What is the name of your dish?</label>
                        <input
                            type="text"
                            className="block w-full p-2 text-gray-700 bg-white border-2 border-black rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-black focus:border-black dark:focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
                            id="dish"
                            name="dish"
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="mealType">What type of meal is it?</label>
                        <select
                            id="mealType"
                            name="mealType"
                            className="block w-full p-2 text-gray-700 bg-white border-2 border-black rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-black focus:border-black dark:focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
                        >
                            <option value="">Select a meal type</option>
                            <option value="main">Appetizer</option>
                            <option value="appetizer">Main course</option>
                            <option value="dessert">Dessert</option>
                            <option value="side">Side</option>
                            <option value="breakfast">Breakfast</option>
                            <option value="snack">Snack</option>
                        </select>
                    </div>


                    <div className="mt-6">
                        <label htmlFor="description">Give a short description of the dish:</label>
                        <textarea
                            type="text"
                            className="block w-full p-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            id="description"
                            name="description"
                        >
                        </textarea>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="ingredients">What are the ingredients? Please enter each ingredient separated by a comma:</label>
                        <textarea
                            type="text"
                            className="block w-full p-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            id="ingredients"
                            name="ingredients"
                            placeholder="e.g. pizza dough, tomato sauce, mozzarella"
                        ></textarea>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="instructions">How is the dish prepared?</label>
                        <textarea
                            type="text"
                            className="block w-full p-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            id="instructions"
                            name="instructions"
                        ></textarea>
                    </div>

                    <div className="mt-2">
                        <label htmlFor="imageUrl">Add a link to an image of your dish:</label>
                        <input
                            type="text"
                            className="block w-full p-2 text-gray-700 bg-white border-2 border-black rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-black focus:border-black dark:focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
                            id="imageUrl"
                            name="imageUrl"
                            placeholder="e.g. https://imagehost.com/img"
                        />
                    </div>

                    <div className="mt-2">
                        <label htmlFor="tags">Add tags to help make finding your recipe easier!</label>
                        <input
                            type="text"
                            className="block w-full p-2 text-gray-700 bg-white border-2 border-black rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-black focus:border-black dark:focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
                            id="tags"
                            name="tags"
                            placeholder="e.g. pizza, italian cuisine"
                        />
                    </div>

                    <div className="mt-6">
                        <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                            Share your recipe!
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}