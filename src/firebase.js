import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDPva-OarssOZfno7VdqrxQV4zQWCFAdMU",
  authDomain: "auth-tutorial-50f4f.firebaseapp.com",
  projectId: "auth-tutorial-50f4f",
  storageBucket: "auth-tutorial-50f4f.appspot.com",
  messagingSenderId: "284192155178",
  appId: "1:284192155178:web:c442e07815fa93dc48c553",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
