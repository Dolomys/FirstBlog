// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNGoCdu3scPBOhNl2Hu-9SOprUOqBaL-0",
  authDomain: "dolomys-project.firebaseapp.com",
  projectId: "dolomys-project",
  storageBucket: "dolomys-project.appspot.com",
  messagingSenderId: "124119779852",
  appId: "1:124119779852:web:8fddd16335a5b5ef1ebc29",
  measurementId: "G-KGTQSC1MKW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app