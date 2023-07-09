//Firebase Config
//NOTE: The other Firebase API keys and config are in the firebasecf.js file
import { app } from "./firebasecf";

//HTML Elements Imports
import {
  inputEmail,
  inputPassword,
  btnLogin,
  logoutBtn,
  errorBlock,
  errorField,
  userProfile,
  addFunds,
  availableBalance,
  name,
  accountNumber,
  loadingScreen,
  purchaseDate1,
  purchaseDate2,
  purchaseDate3,
  purchaseDate4,
  purchaseDate5,
  merchantName1,
  merchantName2,
  merchantName3,
  merchantName4,
  merchantName5,
  purchaseAmount1,
  purchaseAmount2,
  purchaseAmount3,
  purchaseAmount4,
  purchaseAmount5,
} from "./ui";

//Firebase Imports
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  AuthErrorCodes,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";

//AUTHENTICATION FUNCTIONS
const auth = getAuth(app);

//FIRESTORE FUNCTIONS
//Firestore
const db = getFirestore(app);

//Monitor Authentication State
const monitorAuthState = async () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is logged in");
      readData(user.uid);
    } else {
      console.log("User is logged out");
      showSignedOut();
    }
  });
};

const showLoggedIn = () => {
  balanceForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
  userProfile.classList.remove("hidden");
  loadingScreen.classList.add("hidden");
};

const showSignedOut = () => {
  balanceForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
  userProfile.classList.add("hidden");
  loadingScreen.classList.add("hidden");
};

const loading = () => {
  loadingScreen.classList.remove("hidden");
  loginForm.classList.add("hidden");
  balanceForm.classList.add("hidden");
  userProfile.classList.add("hidden");
  errorBlock.classList.add("hidden");
};

monitorAuthState();

//Login
const loginEmailPassword = async () => {
  loading();
  const loginEmail = inputEmail.value;
  const loginPassword = inputPassword.value;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    console.log(userCredential.user);
  } catch (error) {
    console.log(error);
    loginError(error);
    loadingScreen.classList.add("hidden");
    loginForm.classList.remove("hidden");
  }
};

btnLogin.addEventListener("click", loginEmailPassword);

//Logout
const logout = async () => {
  showSignedOut();
  await signOut(auth);
};

logoutBtn.addEventListener("click", logout);

//Error
const loginError = (error) => {
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
};

//Read data
const readData = async (useruid) => {
  const user = useruid;
  const docRef = doc(db, "users", user);
  const docSnap = await getDoc(docRef);
  showLoggedIn();
  console.log(docSnap.data().balance);
  availableBalance.innerHTML = "₱" + docSnap.data().balance;
  name.innerHTML = docSnap.data().firstName + " " + docSnap.data().lastName;
  accountNumber.innerHTML = docSnap.data().accountNumber;

  //Purchase History
  const phDocRef = doc(
    db,
    "users",
    user,
    "transactions",
    "09wbxSCg0gTZ1PhIrPwW"
  );
  const phDocSnap = await getDoc(phDocRef);
  console.log(phDocSnap.data().merchantName);
};
