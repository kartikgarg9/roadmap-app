import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCy7nlOchPCN-rV-Z8Zr_VbswFSztru4-o",
    authDomain: "roadmap-developer.firebaseapp.com",
    projectId: "roadmap-developer",
    storageBucket: "roadmap-developer.firebasestorage.app",
    messagingSenderId: "736828172850",
    appId: "1:736828172850:web:915eb5ad537f2c62eeea2b"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
