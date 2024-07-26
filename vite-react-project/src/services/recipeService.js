import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../firebase/firebase.js';
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
    await addDoc(collection(firestore, "recipes"), {
      ...formData,
      ownerId: userId,
      ingredients: formData.ingredients.split(",").map(ingredient => ingredient.trim()),
      tags: formData.tags.split(",").map(tag=> tag.trim()),
      timestamp: serverTimestamp()
    });
    return { success: true };
  } catch (err) {
    console.error("Error adding document: ", err);
    return { success: false, error: "Error submitting recipe" };
  }
};

export {
    validateFormData,
    submitRecipe
}