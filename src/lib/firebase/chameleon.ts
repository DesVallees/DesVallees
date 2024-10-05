// Import the functions from the SDKs
import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_chameleon_apiKey,
    authDomain: import.meta.env.VITE_chameleon_authDomain,
    projectId: import.meta.env.VITE_chameleon_projectId,
    storageBucket: import.meta.env.VITE_chameleon_storageBucket,
    messagingSenderId: import.meta.env.VITE_chameleon_messagingSenderId,
    appId: import.meta.env.VITE_chameleon_appId,
};

// Initialize Firebase
let firebaseApp: FirebaseApp = getApps().find(app => app.name === 'chameleon') || initializeApp(firebaseConfig, 'chameleon');

// Export Database
export const db = getFirestore(firebaseApp)