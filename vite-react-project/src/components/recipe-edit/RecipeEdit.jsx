import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import { useNavigate, useParams } from 'react-router-dom';
import { getById, editRecipe, validateFormData } from '../../services/recipeService';



export default function RecipeEdit() {
    const { id } = useParams();
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
    
    useEffect(() => {
        (async () => {
            try {
                const fetchedRecipe = await getById(id);
                if (user.uid !== fetchedRecipe.ownerId) {
                    navigate("/recipes");
                }
                setFormData({ 
                    ...fetchedRecipe,
                    ingredients: fetchedRecipe.ingredients.join("\n"),
                    instructions: fetchedRecipe.instructions.join("\n"),
                    tags: fetchedRecipe.tags.join(", ")
                });
            } catch (err) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    msg: err.message
                }))
            }
        })();
    }, [id]);   
    

    function changeHandler(e) {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
    };
    
    async function submitHandler(e) {
        e.preventDefault();
        
        const validationErrors = validateFormData(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        const { success, errorMsg } = await editRecipe(formData, id);
        
        if (success) {
            navigate(`/recipes/${id}/details`);
        } else {
            setErrors(prevErrors => ({
                ...prevErrors,
                msg: errorMsg
            }));
        }
        
    };
    
    const ingredientPlaceholder = "2 eggs\n200g sugar";

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container flex items-center justify-center min-h-screen px-6 pb-16 mx-auto">
                <form className="w-full max-w-md" onSubmit={submitHandler}>

                    <div className="flex items-center justify-center">
                        <p>Edit your recipe:</p>
                    </div>
                    <div className="mt-8">
                        <label htmlFor="name">What is your dish called?</label>
                        <input
                            type="text"
                            className="block w-full p-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={changeHandler}
                        />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                    </div>

                    <div className="mt-4">
                        <label htmlFor="mealType">What type of meal is it?</label>
                        <select
                            className="block w-full p-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
                        {errors.mealType && <p className="text-red-500">{errors.mealType}</p>}
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
                        {errors.description && <p className="text-red-500">{errors.description}</p>}
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
                        {errors.ingredients && <p className="text-red-500">{errors.ingredients}</p>}
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
                        {errors.instructions && <p className="text-red-500">{errors.instructions}</p>}
                    </div>

                    <div className="mt-2">
                        <label htmlFor="imageUrl">Add a link to an image of your dish:</label>
                        <input
                            type="text"
                            className="block w-full p-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            id="imageUrl"
                            name="imageUrl"
                            placeholder="e.g. https://imagehost.com/img"
                            value={formData.imageUrl}
                            onChange={changeHandler}
                        />
                        {errors.imageUrl && <p className="text-red-500">{errors.imageUrl}</p>}
                    </div>

                    <div className="mt-2">
                        <label htmlFor="tags">Add tags, separated by a comma, to make finding your recipe easier!</label>
                        <input
                            type="text"
                            className="block w-full p-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            id="tags"
                            name="tags"
                            placeholder="e.g. pizza, italian cuisine"
                            value={formData.tags}
                            onChange={changeHandler}
                        />
                        {errors.tags && <p className="text-red-500">{errors.tags}</p>}
                    </div>

                    <div className="mt-6">
                        <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                            Update your recipe!
                        </button>
                    </div>

                    {errors.msg && <p className='text-red-500'>Error updating recipe. Please try again later.</p>}
                </form>
            </div>
        </section>
    );
}