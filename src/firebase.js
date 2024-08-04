import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5EIjIsg6H875Au1uBPtZpeIqkXaYlNbE",
  authDomain: "twitter-clone-00s.firebaseapp.com",
  projectId: "twitter-clone-00s",
  storageBucket: "twitter-clone-00s.appspot.com",
  messagingSenderId: "461264666351",
  appId: "1:461264666351:web:69d930967408945e07e51a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
