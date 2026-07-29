import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZcisTeLgauFIVVcvCBmIRVt7AZd-PNCE",
  authDomain: "expense-tracker-bf6b9.firebaseapp.com",
  projectId: "expense-tracker-bf6b9",
  storageBucket: "expense-tracker-bf6b9.firebasestorage.app",
  messagingSenderId: "192795657351",
  appId: "1:192795657351:web:4b26d42f877d9e114ea422",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;