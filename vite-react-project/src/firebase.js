import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "softuni-react-spa-project.firebaseapp.com",
  projectId: "softuni-react-spa-project",
  storageBucket: "softuni-react-spa-project.appspot.com",
  messagingSenderId: "413085070467",
  appId: "1:413085070467:web:19c258570b6fe0f20597b6"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { firebaseApp, auth, db }