import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
} from "firebase/firestore";


//database stuff
// TODO: Replace with your app's Firebase project configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDftcY0ykIR1jSmfa2aVo18SHogtAogUMI",
  authDomain: "pokeballguesser.firebaseapp.com",
  projectId: "pokeballguesser",
  storageBucket: "pokeballguesser.appspot.com",
  messagingSenderId: "838767516751",
  appId: "1:838767516751:web:51e409b7cd229428df5e3a",
  measurementId: "G-X54KWZC5QG",
};

export const app = initializeApp(firebaseConfig);

export const firestore = getFirestore();
export const db = getFirestore(app);
export var gamesCollection = collection(firestore, "games");

