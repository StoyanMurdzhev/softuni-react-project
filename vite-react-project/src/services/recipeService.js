import { collection, getDocs, addDoc, serverTimestamp, query, orderBy, limit, startAfter } from 'firebase/firestore';
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
            ingredients: formData.ingredients.split(",").map(ingredient => ingredient.trim()),
            tags: formData.tags.split(",").map(tag => tag.trim()),
            timestamp: serverTimestamp()
        });
        return { success: true };
    } catch (err) {
        console.error("Error adding document: ", err);
        return { success: false, error: "Error submitting recipe" };
    }
};

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

export {
    validateFormData,
    submitRecipe,
    getLastThree,
    getAllWithPagination
}