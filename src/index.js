//Login Imports
import { inputEmail, inputPassword, btnLogin } from "./ui";

//Firebase Config
//NOTE: The other Firebase API keys and config are in the firebasecf.js file
import { app } from "./firebasecf";

//Firebase Imports
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);

console.log(btnLogin);

//Login Functions
const loginEmailPassword = async () => {
    const loginEmail = inputEmail.value;
    const loginPassword = inputPassword.value;

    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    console.log(userCredential.user);
}

btnLogin.addEventListener("click", loginEmailPassword);