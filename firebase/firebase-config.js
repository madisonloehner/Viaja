import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-bzH4R2oB-SaGp0GF33ke7baZlm9Z2uU",
  authDomain: "final-viaja.firebaseapp.com",
  databaseURL: "https://final-viaja-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "final-viaja",
  storageBucket: "final-viaja.appspot.com",
  messagingSenderId: "298185070828",
  appId: "1:298185070828:web:a5bf5ee0f5362f6d84edc9"
};

//initialize firebase in app 
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const authentication = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });

export {authentication, db}
