import { collection, getDocs, addDoc, serverTimestamp, query, orderBy, limit, startAfter, getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase.js';
import validator from 'validator';

function validateFormData(formData) {
    const errors = {};

    for (const key in formData) {
        if (!formData[key]) {
            errors[key] = 'This field is required';
        }
    }

    if (!validator.isURL(formData.imageUrl, { protocols: ['http', 'https'], require_protocol: true })) {
        errors.imageUrl = 'Please enter a valid URL';
    }
    console.log(errors);
    return errors;
};

async function submitRecipe(formData, userId) {
    try {
        await addDoc(collection(db, "recipes"), {
            ...formData,
            ownerId: userId,
            instructions: formData.instructions.split("\n").map(instruction => instruction.trim()),
            ingredients: formData.ingredients.split("\n").map(ingredient => ingredient.trim()),
            tags: formData.tags.split(",").map(tag => tag.trim()),
            timestamp: serverTimestamp()
        });
        return { success: true };
    } catch (err) {
        console.error("Error adding document: ", err);
        return { success: false, error: "Error submitting recipe" };
    }
};

async function getById(id) {
    try {
        const recipeRef = doc(db, "recipes", id);
        const recipe = await getDoc(recipeRef);
        if (recipe.exists()) {
            return { ...recipe.data(), id: recipe.id };
        } else {
            throw new Error ("Recipe not found");
        }

    } catch (error) {

        console.log(error);
        throw error

    }
}

async function getLastThree() {
    try {
        const recipesRef = collection(db, "recipes");

        const q = query(recipesRef, orderBy("timestamp", "desc"), limit(3));

        const querySnapshot = await getDocs(q);

        const recipes = querySnapshot.docs.map(
            doc => (
                {
                    ...doc.data(),
                    id: doc.id
                }
            )
        );

        return recipes;

    } catch (error) {

        console.log(error);
        throw error;

    }
}

async function getAllWithPagination(lastVisible, pageSize = 6) {
    try {
        const recipesRef = collection(db, "recipes");

        const q = query(recipesRef, orderBy("timestamp", "desc"), lastVisible ? startAfter(lastVisible) : limit(pageSize));

        const querySnapshot = await getDocs(q);

        const recipes = querySnapshot.docs.map(
            doc => (
                {
                    ...doc.data(),
                    id: doc.id
                }
            )
        );

        const lastVisibleRecipe = querySnapshot.docs[querySnapshot.docs.length - 1];

        return { recipes, lastVisibleRecipe };

    } catch (error) {

        console.log(error);
        throw error;

    }
}

function convertTimestamp(recipe) {
    const recipeDate = recipe.timestamp.toDate();
    const formattedDate = recipeDate.toISOString().split("T")[0];
    return formattedDate;
}

export {
    validateFormData,
    submitRecipe,
    getById,
    getLastThree,
    getAllWithPagination,
    convertTimestamp
}