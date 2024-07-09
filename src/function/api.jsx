// ------- Firebase -------
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAmVORjNB0yqi82u9gm4dLXBTjkGMmjUkc",
    authDomain: "mapprototype-7dd8a.firebaseapp.com",
    databaseURL: "https://mapprototype-7dd8a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mapprototype-7dd8a",
    storageBucket: "mapprototype-7dd8a.appspot.com",
    messagingSenderId: "680118634581",
    appId: "1:680118634581:web:c58627120ec26d6011ecdc",
    measurementId: "G-D0GP58K9ST"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

export default db