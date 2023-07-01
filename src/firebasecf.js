import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCuJJLIhMJ1erv6vRVFLbpYuiDpYc7JVnU",
  authDomain: "better-gcash.firebaseapp.com",
  databaseURL: "https://better-gcash-default-rtdb.firebaseio.com",
  projectId: "better-gcash",
  storageBucket: "better-gcash.appspot.com",
  messagingSenderId: "293907249950",
  appId: "1:293907249950:web:5aa7b7a0bfba14e0e3a70f",
  measurementId: "G-YD5KN6HJRB"
};

const app = initializeApp(firebaseConfig);

export { app };