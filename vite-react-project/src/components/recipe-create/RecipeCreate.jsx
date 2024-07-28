import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';
import { submitRecipe, validateFormData } from '../../services/recipeService';



export default function RecipeCreate() {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        ingredients: "",
        instructions: "",
        imageUrl: "",
        mealType: "",
        tags: ""
    });
    const [errors, setErrors] = useState({});
    
    const navigate = useNavigate();

    const ingredientPlaceholder = "2 eggs\n200g sugar"

    function changeHandler(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    async function submitHandler(e) {
        e.preventDefault();

        const validationErrors = validateFormData(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (!user) {
            alert("You must be logged in to submit a recipe");
            return;
        }

        const { success, error } = await submitRecipe(formData, user.uid);
        
        if (success) {
            navigate("/");
        } else {
            console.log(error);
            alert(error);
        }

    };

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container flex items-center justify-center min-h-screen px-6 pb-16 mx-auto">
                <form className="w-full max-w-md" onSubmit={submitHandler}>

                    <div className="flex items-center justify-center">
                        <p>Post a recipe:</p>
                    </div>
                    <div className="mt-8">
                        <label htmlFor="name">What is your dish called?</label>
                        <input
                            type="text"
                            className="block w-full p-2 text-gray-700 bg-white border-2 border-black rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-black focus:border-black dark:focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={changeHandler}
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="mealType">What type of meal is it?</label>
                        <select
                            className="block w-full p-2 text-gray-700 bg-white border-2 border-black rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-black focus:border-black dark:focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
                            id="mealType"
                            name="mealType"
                            value={formData.mealType}
                            onChange={changeHandler}
                        >
                            <option value="">Select a meal type</option>
                            <option value="Appetizer">Appetizer</option>
                            <option value="Main course">Main course</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Side">Side</option>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Snack">Snack</option>
                        </select>
                    </div>


                    <div className="mt-6">
                        <label htmlFor="description">Give a short description of the dish:</label>
                        <textarea
                            type="text"
                            className="block w-full p-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={changeHandler}
                        >
                        </textarea>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="ingredients">What are the ingredients? Please enter each ingredient on a new line:</label>
                        <textarea
                            type="text"
                            className="block w-full p-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 whitespace-pre-wrap overflow-auto"
                            id="ingredients"
                            name="ingredients"
                            placeholder={ingredientPlaceholder}
                            value={formData.ingredients}
                            onChange={changeHandler}
                        ></textarea>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="instructions">How is the dish prepared?</label>
                        <textarea
                            type="text"
                            className="block w-full p-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 whitespace-pre-wrap"
                            id="instructions"
                            name="instructions"
                            value={formData.instructions}
                            onChange={changeHandler}
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
                            value={formData.imageUrl}
                            onChange={changeHandler}
                        />
                    </div>

                    <div className="mt-2">
                        <label htmlFor="tags">Add tags, separated by a comma, to make finding your recipe easier!</label>
                        <input
                            type="text"
                            className="block w-full p-2 text-gray-700 bg-white border-2 border-black rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-black focus:border-black dark:focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
                            id="tags"
                            name="tags"
                            placeholder="e.g. pizza, italian cuisine"
                            value={formData.tags}
                            onChange={changeHandler}
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