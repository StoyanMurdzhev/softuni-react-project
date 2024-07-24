import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHklJbo5e9GY69F35D1XKh_lhUfr0yM0M",
  authDomain: "softuni-react-spa-project.firebaseapp.com",
  projectId: "softuni-react-spa-project",
  storageBucket: "softuni-react-spa-project.appspot.com",
  messagingSenderId: "413085070467",
  appId: "1:413085070467:web:19c258570b6fe0f20597b6"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

export { firebaseApp, firebaseAuth }