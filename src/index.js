//Login Imports
import { inputEmail, inputPassword, btnLogin } from "./ui";

//Firebase Config
//NOTE: The other Firebase API keys and config are in the firebasecf.js file

import { app } from "./firebasecf";

//Firebase Imports
import { getAuth, connectAuthEmulator, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);
connectAuthEmulator(auth, "http://localhost:9099");

console.log(btnLogin);

//Login Function
const loginEmailPassword = async () => {
  const email = inputEmail.value;
  const password = inputPassword.value;

  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  console.log(userCredential.user);
}

//btnLogin.addEventListener("click", loginEmailPassword);

console.log(auth);