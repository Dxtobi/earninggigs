import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABPMD-7gW7wh0tEWVnLMqjFpz8Mqmq5Mw",
  authDomain: "earninggigsng.firebaseapp.com",
  projectId: "earninggigsng",
  storageBucket: "earninggigsng.appspot.com",
  messagingSenderId: "539027158129",
  appId: "1:539027158129:web:16f1f45421c5a4838f17d0",
  measurementId: "G-SBNBK0DZT7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);