import { collection, getDocs, addDoc, serverTimestamp, query, orderBy, limit, startAfter, getDoc, doc, updateDoc, deleteDoc, increment, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase/firebase.js';
import validator from 'validator';

function validateFormData(formData) {
    const errors = {};

    for (const key in formData) {
        if (!formData[key]) {
            errors[key] = "This field is required.";
        }
    }

    if (formData.name.length && formData.name.length < 2) {
        errors.name = "Name must be at least two characters long."
    }
    if (formData.description.length && formData.description.length < 10) {
        errors.description = "Description must be at least ten characters long."
    }
    if (formData.instructions.length && formData.instructions.length < 10) {
        errors.description = "Instructions must be at least ten characters long."
    }

    if (!validator.isURL(formData.imageUrl, { protocols: ['http', 'https'], require_protocol: true })) {
        errors.imageUrl = "Please enter a valid URL";
    }

    return errors;
};

async function postRecipe(formData, userId) {
    try {
        await addDoc(collection(db, "recipes"), {
            ...formData,
            ownerId: userId,
            instructions: formData.instructions.split("\n").map(instruction => instruction.trim()),
            ingredients: formData.ingredients.split("\n").map(ingredient => ingredient.trim()),
            tags: formData.tags.split(",").map(tag => tag.trim()),
            createdOn: serverTimestamp(),
            likes: {
                count: 0,
                likedBy: []
            }
        });
        return { success: true };
    } catch (err) {
        return { success: false, error: "Error submitting recipe. Please try again later." };
    }
};

async function editRecipe(formData, id) {
    try {
        const recipeRef = doc(db, "recipes", id);
        await updateDoc(recipeRef, {
            ...formData,
            instructions: formData.instructions.split("\n").map(instruction => instruction.trim()),
            ingredients: formData.ingredients.split("\n").map(ingredient => ingredient.trim()),
            tags: formData.tags.split(",").map(tag => tag.trim()),
            editedOn: serverTimestamp()
        });
        return { success: true };
    } catch (err) {
        return { success: false, error: "Error updating recipe. Please try again later."}
    }
}

async function deleteRecipe(id) {
    try {
        const recipeRef = doc(db, "recipes", id);
        await deleteDoc(recipeRef);
    } catch (err) {
        console.error("Error deleting recipe: ", err);
        return err;
    }
}

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
        throw error;

    }
};

async function getLastThree() {
    try {
        const recipesRef = collection(db, "recipes");

        const q = query(recipesRef, orderBy("createdOn", "desc"), limit(3));

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
};

async function getAllWithPagination(lastVisible, pageSize = 6) {
    try {
        const recipesRef = collection(db, "recipes");

        const q = query(recipesRef, orderBy("createdOn", "desc"), lastVisible ? startAfter(lastVisible) : limit(pageSize));

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
};

function convertTimestamp(recipe) {
    let recipeDate;

    if (recipe.editedOn) {
        recipeDate = recipe.editedOn.toDate();
    } else {
        recipeDate = recipe.createdOn.toDate();
    }

    const formattedDate = recipeDate.toISOString().split("T")[0];
    return formattedDate;
};

async function likeRecipe(id, userId) {
    try {
        const recipeRef = doc(db, "recipes", id);
        const recipe = await getDoc(recipeRef);
        const { likes } = recipe.data();

        if (likes.likedBy.includes(userId)) {
            throw new Error("You have already liked this article.")
        }

        await updateDoc(recipeRef, {
            "likes.count": increment(1),
            "likes.likedBy": arrayUnion(userId)
        });
    } catch (err) {
        throw err;
    }
}

export {
    validateFormData,
    postRecipe,
    editRecipe,
    deleteRecipe,
    getById,
    getLastThree,
    getAllWithPagination,
    likeRecipe,
    convertTimestamp
}