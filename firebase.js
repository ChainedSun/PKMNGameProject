// Import the functions you need from the SDKs you need
import { initializeApp } from "../node_modules/firebase/app";
import { getAnalytics } from "../node_modules/firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3nNVDLsf0209PmlYuc0lCK0R-wcOLksk",
  authDomain: "pokemonbrowserproject.firebaseapp.com",
  projectId: "pokemonbrowserproject",
  storageBucket: "pokemonbrowserproject.appspot.com",
  messagingSenderId: "214344893250",
  appId: "1:214344893250:web:85e306fad445638a2a3edb",
  measurementId: "G-T8TR9HJ20H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app)