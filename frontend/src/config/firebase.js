import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBbXahhTzmUACRlqTbNftWzl3mUowM9tL8",
  authDomain: "dalmedia-csci5709.firebaseapp.com",
  projectId: "dalmedia-csci5709",
  storageBucket: "dalmedia-csci5709.appspot.com",
  messagingSenderId: "66871118698",
  appId: "1:66871118698:web:2812970943c5060ad17313",
  measurementId: "G-DS2L9SG670",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
