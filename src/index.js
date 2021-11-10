import "./style/style.css";
import BackgroundImage from "./images/waldo.jpeg";
import {
  createDropDown,
  drawCircleAroundCharacter,
  addImagesToStartPage,
} from "./dom.js";
import { getFirebaseConfig } from "./firebase-config.js";
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

// user should see info when site loads and then see the image and try to find waldo. the user should know that he should try to find the characters asap. also have a reference of characters to look for.

const displayImage = function () {
  const background = document.getElementById("background");
  const img = document.createElement("img");
  img.src = BackgroundImage;
  img.alt = "backgroundimage";
  img.setAttribute("id", "backgroundimage");
  background.appendChild(img);
  img.addEventListener("click", (event) => {
    createDropDown(event);
  });
};

//window.onload = displayImage;
//loading screen

// const checkIfUserIsLoggedIn = function () {
//   const signedin = getAuth().currentUser;
//   if (signedin === null) {
//     addImagesToStartPage();
//   } else {
//     const gamestartdiv = document.getElementById("gamestart");
//     const backgrounddiv = document.getElementById("background");
//     gamestartdiv.hidden = true;
//     backgrounddiv.hidden = false;
//   }
// };
// window.onload = checkIfUserIsLoggedIn;

const calculateLocations = function (character) {
  const img = document.getElementById("backgroundimage");
  switch (character) {
    case "waldo":
      const waldoLocationMinWidth = Math.ceil(0.3963 * Number(img.clientWidth));
      const waldoLocationMaxWidth = Math.ceil(0.4123 * Number(img.clientWidth));
      const waldoLocationMinHeight = Math.ceil(
        0.5879 * Number(img.clientHeight)
      );
      const waldoLocationMaxHeight = Math.ceil(
        0.6352 * Number(img.clientHeight)
      );
      const waldo = {
        minwidth: waldoLocationMinWidth,
        maxwidth: waldoLocationMaxWidth,
        minheight: waldoLocationMinHeight,
        maxheight: waldoLocationMaxHeight,
      };
      return waldo;
    case "odlaw":
      const odlawLocationMinWidth = Math.ceil(0.062 * Number(img.clientWidth));
      const odlawLocationMaxWidth = Math.ceil(0.077 * Number(img.clientWidth));
      const odlawLocationMinHeight = Math.ceil(
        0.6616 * Number(img.clientHeight)
      );
      const odlawLocationMaxHeight = Math.ceil(
        0.6928 * Number(img.clientHeight)
      );
      const odlaw = {
        minwidth: odlawLocationMinWidth,
        maxwidth: odlawLocationMaxWidth,
        minheight: odlawLocationMinHeight,
        maxheight: odlawLocationMaxHeight,
      };
      return odlaw;
    case "wenda":
      const wendaLocationMinWidth = Math.ceil(0.2888 * Number(img.clientWidth));
      const wendaLocationMaxWidth = Math.ceil(0.3006 * Number(img.clientWidth));
      const wendaLocationMinHeight = Math.ceil(
        0.4764 * Number(img.clientHeight)
      );
      const wendaLocationMaxHeight = Math.ceil(
        0.5359 * Number(img.clientHeight)
      );
      const wenda = {
        minwidth: wendaLocationMinWidth,
        maxwidth: wendaLocationMaxWidth,
        minheight: wendaLocationMinHeight,
        maxheight: wendaLocationMaxHeight,
      };
      return wenda;
    case "wizard":
      const wizardLocationMinWidth = Math.ceil(
        0.7743 * Number(img.clientWidth)
      );
      const wizardLocationMaxWidth = Math.ceil(
        0.7897 * Number(img.clientWidth)
      );
      const wizardLocationMinHeight = Math.ceil(
        0.5369 * Number(img.clientHeight)
      );
      const wizardLocationMaxHeight = Math.ceil(
        0.5898 * Number(img.clientHeight)
      );
      const wizard = {
        minwidth: wizardLocationMinWidth,
        maxwidth: wizardLocationMaxWidth,
        minheight: wizardLocationMinHeight,
        maxheight: wizardLocationMaxHeight,
      };
      return wizard;
    case "woof":
      const woofLocationMinWidth = Math.ceil(0.5823 * Number(img.clientWidth));
      const woofLocationMaxWidth = Math.ceil(0.5936 * Number(img.clientWidth));
      const woofLocationMinHeight = Math.ceil(
        0.9007 * Number(img.clientHeight)
      );
      const woofLocationMaxHeight = Math.ceil(
        0.9105 * Number(img.clientHeight)
      );
      const woof = {
        minwidth: woofLocationMinWidth,
        maxwidth: woofLocationMaxWidth,
        minheight: woofLocationMinHeight,
        maxheight: woofLocationMaxHeight,
      };
      return woof;
    default:
      console.log("error error. wrong character called");
  }
};

const checkIfSelectedCharacterIsCorrect = async function (coord, eventtarget) {
  const clickedX = Number(coord[0]);
  const clickedY = Number(coord[1]);
  const clickedTargetLocationOnDB = await getLocationFromDB(
    eventtarget.dataset.character
  );
  const minwidth = Number(clickedTargetLocationOnDB.minwidth);
  const maxwidth = Number(clickedTargetLocationOnDB.maxwidth);
  const minheight = Number(clickedTargetLocationOnDB.minheight);
  const maxheight = Number(clickedTargetLocationOnDB.maxheight);
  if (
    clickedX <= maxwidth &&
    clickedX >= minwidth &&
    clickedY <= maxheight &&
    clickedY >= minheight
  ) {
    alert("Correct!");
    drawCircleAroundCharacter(
      clickedX,
      clickedY,
      eventtarget.dataset.character
    );
    return true;
  } else {
    alert("Wrong. Try again");
    return false;
  }
};

const signIn = async function () {
  try {
    await signInAnonymously(getAuth());
  } catch (error) {
    console.log("Error signing in ", error);
  }
};

const initFirebaseAuth = function () {
  onAuthStateChanged(getAuth(), authStateObserver);
};

const authStateObserver = function (user) {
  if (user) {
    const loadingdiv = document.getElementById("loading");
    loadingdiv.style.display = "none";
    const gamestartdiv = document.getElementById("gamestart");
    const backgrounddiv = document.getElementById("background");
    gamestartdiv.hidden = true;
    backgrounddiv.hidden = false;
    displayImage();
    initUser(user.uid);
  } else {
    const loadingdiv = document.getElementById("loading");
    loadingdiv.style.display = "none";
    const gamestartdiv = document.getElementById("gamestart");
    loadingdiv.hidden = true;
    gamestartdiv.hidden = false;
    addImagesToStartPage();
  }
};

const initUser = async function (uid) {
  try {
    await setDoc(doc(getFirestore(), "users", uid), {
      waldoLocation: calculateLocations("waldo"),
      odlawLocation: calculateLocations("odlaw"),
      wendaLocation: calculateLocations("wenda"),
      wizardLocation: calculateLocations("wizard"),
      woofLocation: calculateLocations("woof"),
      charactersFound: [],
      startingTime: serverTimestamp(),
    });
  } catch (error) {
    console.log("Error writing to database ", error);
  }
};

const getLocationFromDB = async function (character) {
  const docRef = doc(getFirestore(), "users", getAuth().currentUser.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const alldata = docSnap.data();
    return alldata[character];
  } else {
    console.log("No such document!");
  }
};

const reCalculateLocationsOnResize = async function () {
  if (getAuth().currentUser === null) {
    return;
  }
  const currentuser = getAuth().currentUser.uid;
  const docRef = doc(getFirestore(), "users", currentuser);
  try {
    await updateDoc(docRef, {
      waldoLocation: calculateLocations("waldo"),
      odlawLocation: calculateLocations("odlaw"),
      wendaLocation: calculateLocations("wenda"),
      wizardLocation: calculateLocations("wizard"),
      woofLocation: calculateLocations("woof"),
    });
  } catch (error) {
    console.log("Couldn't update doc in database ", error);
  }
};

const loginbutton = document.getElementById("login");
loginbutton.addEventListener("click", signIn);

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);
initFirebaseAuth();

//window.onload = onPageLoad();
window.onresize = reCalculateLocationsOnResize;

export default checkIfSelectedCharacterIsCorrect;

//check characters found
//timestamp and compare
//scoreboard
//mark found elements
//high score board. prompt user for name if he's on top 5
