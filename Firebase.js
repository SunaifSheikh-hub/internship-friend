// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDFKl-1MNDGh5K4CYZ97pZZ_tmG-kDOhBc",
    authDomain: "friendsapp-ee946.firebaseapp.com",
    projectId: "friendsapp-ee946",
    storageBucket: "friendsapp-ee946.appspot.com",
    messagingSenderId: "677125065713",
    appId: "1:677125065713:web:9892d1762290412a9c5250"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
const storage = getStorage(app)



export { db, app, auth, storage, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword };
