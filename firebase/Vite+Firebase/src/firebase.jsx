import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAjeJogf1ZM3VwvLOj2eOGp9ccgnPqHcmg",
  authDomain: "test-c9413.firebaseapp.com",
  projectId: "test-c9413",
  storageBucket: "test-c9413.appspot.com",
  messagingSenderId: "1015312253904",
  appId: "1:1015312253904:web:bc9acf93b121846d2eefd5",
  measurementId: "G-4G8TCBD9R5"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);