import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyALfI_-A3OxLBYR2rsUPfFJSfgqdOVxiIY",
  authDomain: "chat-application-9da5a.firebaseapp.com",
  projectId: "chat-application-9da5a",
  storageBucket: "chat-application-9da5a.firebasestorage.app",
  messagingSenderId: "138358204888",
  appId: "1:138358204888:web:2de50f237fb370faef2aad",
  measurementId: "G-X3L1H7NF07"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);