//HTML Imports
export const signupEmail = document.querySelector("#email");
export const signupPassword = document.querySelector("#password");
export const firstName = document.querySelector("#first-name");
export const lastName = document.querySelector("#last-name");
export const country = document.querySelector("#country");
export const street = document.querySelector("#street-address");
export const city = document.querySelector("#city");
export const region = document.querySelector("#region");
export const postalCode = document.querySelector("#postal-code");
export const phone = document.querySelector("#phone-number");
export const phoneLabel = document.querySelector("#phoneLabel");
export const signupBtn = document.querySelector("#submitBtn");
export const cancelBtn = document.querySelector("#cancelBtn");
export const errorBlock = document.querySelector("#errorBlock");

//Firebase Imports
import { app } from "./firebasecf";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  AuthErrorCodes,
} from "firebase/auth";
import { getFirestore, doc, setDoc, addDoc } from "firebase/firestore";

//Firestore Initialization
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in");
  } else {
    console.log("User is not signed in");
  }
});

//Signup
const signup = async () => {
  const email = signupEmail.value;
  const password = signupPassword.value;

  try {
    const userCre = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCre.user;
    console.log(user);
    writeUserData(user);
  } catch (error) {
    console.error(error);
    errorBlock.classList.remove("hidden");
    if (error.code == AuthErrorCodes.INVALID_PASSWORD) {
      errorField.innerHTML = "Wrong Password";
    } else if (error.code == AuthErrorCodes.USER_DELETED) {
      errorField.innerHTML = "User Not Found";
    } else if (error.code == AuthErrorCodes.INVALID_EMAIL) {
      errorField.innerHTML = "Invalid Email";
    } else {
      console.log(error.code);
      errorField.innerHTML = error.code;
    }
  }
};

signupBtn.addEventListener("click", signup);

//Write to Firestore
const writeUserData = async (user) => {
  const accountNumber = Math.floor(Math.random() * 9999999999999);
  try {
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      firstName: firstName.value,
      lastName: lastName.value,
      country: country.value,
      street: street.value,
      city: city.value,
      region: region.value,
      postalCode: postalCode.value,
      phone: phone.value,
      accountNumber: accountNumber,
      balance: 0,
    });
    console.log("User Signed Up!");
  } catch (error) {
    errorBlock.classList.remove("hidden");
    if (error.code == AuthErrorCodes.INVALID_PASSWORD) {
      errorField.innerHTML = "Wrong Password";
    } else if (error.code == AuthErrorCodes.USER_DELETED) {
      errorField.innerHTML = "User Not Found";
    } else if (error.code == AuthErrorCodes.INVALID_EMAIL) {
      errorField.innerHTML = "Invalid Email";
    } else {
      console.log(error.code);
      errorField.innerHTML = error.code;
    }
  }
};
