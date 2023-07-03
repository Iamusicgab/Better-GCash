//Firebase Config
//NOTE: The other Firebase API keys and config are in the firebasecf.js file
import { app } from "./firebasecf";

//Login Imports
import { inputEmail, inputPassword, btnLogin, loginSignup, logoutBtn, errorBlock, errorField } from "./ui";

//Firebase Imports
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, AuthErrorCodes } from "firebase/auth";



console.log(btnLogin);

//AUTHENTICATION FUNCTIONS
const auth = getAuth(app);

//Monitor Authentication State
const monitorAuthState = async () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("User is logged in");
            showLoggedIn();
        } else {
            console.log("User is logged out");
            showSignedOut();
        }
    })
}

function showLoggedIn() {
    balanceForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
}
function showSignedOut() {
    balanceForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
}

monitorAuthState();

//Login
const loginEmailPassword = async () => {
    const loginEmail = inputEmail.value;
    const loginPassword = inputPassword.value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        console.log(userCredential.user);
    }
    catch (error) {
        console.log(error);
        loginError(error);
    }

}

btnLogin.addEventListener("click", loginEmailPassword);

//Logout
const logout = async () => {
    await signOut(auth);
}

logoutBtn.addEventListener("click", logout);

//Error
export const loginError = (error) => {
    errorBlock.classList.remove("hidden");
    if (error.code == AuthErrorCodes.INVALID_PASSWORD) {
        errorField.innerHTML = "Wrong Password";
    } else if (error.code == AuthErrorCodes.USER_NOT_FOUND) {
        errorField.innerHTML = "User Not Found";
    } else {
        console.log(error.code);
        errorField.innerHTML = error.code;
    }
}