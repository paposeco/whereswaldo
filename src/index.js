import "./style/style.css";
import {
  drawCircleAroundCharacter,
  addImagesToStartPage,
  addImagesToGame,
  updateStatusSideBar,
  createPrettyAlert,
  promptUserForName,
  displayScoreboard,
  displayImage,
  updateDomAfterRefresh,
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
  increment,
} from "firebase/firestore";

// determines the locations of each character according to the size of the image displayed
const calculateLocations = function (character) {
  let img = document.getElementById("backgroundimage");
  switch (character) {
    //each character has an area of acceptable locations, which is stored in the db
    case "waldo": {
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
    }
    case "odlaw": {
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
    }
    case "wenda": {
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
    }
    case "wizard": {
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
    }
    case "woof": {
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
    }
    default:
      console.log("error error. wrong character called");
  }
};

// gets the character location area from db and checks if the clicked coordinate is inside that area
const checkIfSelectedCharacterIsCorrect = async function (coord, eventtarget) {
  const clickedX = Number(coord[0]);
  const clickedY = Number(coord[1]);
  const clickedTargetLocationOnDB = await getLocationFromDB(
    eventtarget.dataset.character
  );
  const minwidth = Number(clickedTargetLocationOnDB.location.minwidth);
  const maxwidth = Number(clickedTargetLocationOnDB.location.maxwidth);
  const minheight = Number(clickedTargetLocationOnDB.location.minheight);
  const maxheight = Number(clickedTargetLocationOnDB.location.maxheight);
  if (
    clickedX <= maxwidth &&
    clickedX >= minwidth &&
    clickedY <= maxheight &&
    clickedY >= minheight
  ) {
    // if inside the area, updates dom and db
    createPrettyAlert(true, eventtarget);
    updateFoundCharacters(eventtarget.dataset.character);
    updateStatusSideBar(eventtarget.dataset.character);
    drawCircleAroundCharacter(
      clickedX,
      clickedY,
      eventtarget.dataset.character
    );
    return true;
  } else {
    createPrettyAlert(false, eventtarget);
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

const authStateObserver = async function (user) {
  // if user is logged in (has clicked the start button), starts the game
  if (user) {
    // checks if the user as played before (refreshed the page)
    const docRef = doc(getFirestore(), "users", user.uid);
    const docSnap = await getDoc(docRef);
    let userHasPlayedBefore = false;
    if (docSnap.exists()) {
      userHasPlayedBefore = true;
    }
    // hides landing page
    const loadingdiv = document.getElementById("loading");
    loadingdiv.style.display = "none";
    const gamestartdiv = document.getElementById("gamestart");
    const gamediv = document.getElementById("game");
    gamediv.classList.add("showgame");
    gamediv.style.display = "flex";
    gamestartdiv.style.display = "none";
    // loads background image and thumbnails, and creates high scores button
    const placeImageOnBackground = await displayImage();
    addImagesToGame();
    highestScoresLink();
    if (!userHasPlayedBefore) {
      // if user hasn't played before, loads a clean game
      setTimeout(() => {
        initUser(user.uid);
      });
    } else {
      // if the user has played before, fetches information of found characters from db and updates dom
      setTimeout(() => {
        updateDomAfterRefresh(docSnap.data());
      }, 1000);
    }
  } else {
    // displays landing page
    const loadingdiv = document.getElementById("loading");
    loadingdiv.style.display = "none";
    const gamestartdiv = document.getElementById("gamestart");
    gamestartdiv.style.display = "flex";
    addImagesToStartPage();
  }
};

// saves information for current user to db; characters' locations and start time
const initUser = async function (uid) {
  try {
    await setDoc(doc(getFirestore(), "users", uid), {
      waldoLocation: { location: calculateLocations("waldo"), found: false },
      odlawLocation: { location: calculateLocations("odlaw"), found: false },
      wendaLocation: { location: calculateLocations("wenda"), found: false },
      wizardLocation: { location: calculateLocations("wizard"), found: false },
      woofLocation: { location: calculateLocations("woof"), found: false },
      startTime: serverTimestamp(),
      endTime: 0,
      foundcharacters: 0,
    });
  } catch (error) {
    console.log("Error writing to database ", error);
  }
};

// fetches location of a specific character for current user
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

// updates values on db when user finds a character; if after updating the db the number of found characters is the total number of characters, updates the endtime on db and calls the high scores function.
const updateFoundCharacters = async function (character) {
  if (getAuth().currentUser === null) {
    return;
  }
  const currentuser = getAuth().currentUser.uid;
  const docRef = doc(getFirestore(), "users", currentuser);
  //didn't manage to find how to update fields on db when the field name is a variable
  if (character === "waldoLocation") {
    // changes the value of field characterLocation.found to true and increments the found characters +1
    try {
      await updateDoc(docRef, {
        foundcharacters: increment(1),
        "waldoLocation.found": true,
      });
    } catch (error) {
      console.log("Couldn't update doc in database ", error);
    }
  } else if (character === "odlawLocation") {
    try {
      await updateDoc(docRef, {
        foundcharacters: increment(1),
        "odlawLocation.found": true,
      });
    } catch (error) {
      console.log("Couldn't update doc in database ", error);
    }
  } else if (character === "wendaLocation") {
    try {
      await updateDoc(docRef, {
        foundcharacters: increment(1),
        "wendaLocation.found": true,
      });
    } catch (error) {
      console.log("Couldn't update doc in database ", error);
    }
  } else if (character === "wizardLocation") {
    try {
      await updateDoc(docRef, {
        foundcharacters: increment(1),
        "wizardLocation.found": true,
      });
    } catch (error) {
      console.log("Couldn't update doc in database ", error);
    }
  } else if (character === "woofLocation") {
    try {
      await updateDoc(docRef, {
        foundcharacters: increment(1),
        "woofLocation.found": true,
      });
    } catch (error) {
      console.log("Couldn't update doc in database ", error);
    }
  }
  const numberfoundcharacters = await getNumberOfCharactersFoundFromDB(docRef);
  if (numberfoundcharacters === 5) {
    try {
      await updateDoc(docRef, {
        endTime: serverTimestamp(),
      });
    } catch (error) {
      console.log("Couldn't save timestamp for end of round ", error);
    }
    scoreboardDB(currentuser);
  }
};

const getNumberOfCharactersFoundFromDB = async function (docRef) {
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const alldata = docSnap.data();
    const numbercharacters = alldata["foundcharacters"];
    return numbercharacters;
  }
};

// checks the current high scores board and updates if necessary
const scoreboardDB = async function (userid) {
  // there are 2 collections on db; scoreboard and users; this function fetches both
  const docRefScoreboard = doc(getFirestore(), "scoreboard", "scoredata");
  const docSnapScoreboard = await getDoc(docRefScoreboard);
  const docRefPlayer = doc(getFirestore(), "users", userid);
  const docSnapPlayer = await getDoc(docRefPlayer);
  let timeToFinish = 0;

  // calculates player's score
  if (docSnapPlayer.exists()) {
    const playerdata = docSnapPlayer.data();
    const startTime = playerdata["startTime"];
    const endTime = playerdata["endTime"];
    timeToFinish = Math.ceil(Number(endTime) - Number(startTime));
  } else {
    console.log("player not found");
  }

  // sends current players in scoreboard and current anonymous counter to be evaluated
  if (docSnapScoreboard.exists()) {
    const scoreboarddata = docSnapScoreboard.data();
    const currentPlayersInScoreboard = scoreboarddata["players"];
    const currentAnonymous = scoreboarddata["anonymousplayers"];
    // evaluateScores returns an array with a boolean for whether or nor the player made it to the high scores board, the current players on the board (which might include the current user), and a boolean for whether the user provided a name
    const placementInScoreboard = await evaluateScores(
      currentPlayersInScoreboard,
      timeToFinish,
      currentAnonymous,
      userid
    );

    // player didn't make it to the scoreboard
    if (placementInScoreboard[0] === false) {
      displayScoreboard(
        placementInScoreboard[0],
        placementInScoreboard[1],
        timeToFinish
      );
    } else {
      //player made it to the scoreboard but didn't provide a name
      if (placementInScoreboard[2] === true) {
        try {
          await updateDoc(docRefScoreboard, {
            players: placementInScoreboard[1],
            anonymousplayers: increment(1),
          });
        } catch (error) {
          console.log("Couldn't update scoreboard ", error);
        }
      } else {
        //player made it to the scoreboard and provided a name
        try {
          await updateDoc(docRefScoreboard, {
            players: placementInScoreboard[1],
          });
        } catch (error) {
          console.log("Couldn't update scoreboard ", error);
        }
      }
      displayScoreboard(
        placementInScoreboard[0],
        placementInScoreboard[1],
        timeToFinish
      );
    }
  }
};

// compares user time to finish with the scores currently on high scores board
const evaluateScores = async function (
  currentPlayersArray,
  newplayerScore,
  currentanonymous,
  userid
) {
  // get scores
  let currentScores = [];
  let currentUserIds = [];
  // deep copy of current player array
  let copyOriginalPlayerArray = copyArrayValues(currentPlayersArray);
  const copyofcopy = copyArrayValues(copyOriginalPlayerArray);

  // extracts time and name for user on high scores board
  currentPlayersArray.forEach((obj) => {
    currentScores.push(obj.time);
    currentUserIds.push(obj.userindb);
  });

  // compares current scores with user score
  const madeItToScoreboard = currentScores.findIndex(
    (score) => Number(score) === 0 || Number(score) > Number(newplayerScore)
  );

  let anonymoususer = false;

  // if user score is better than at least one score on db
  if (madeItToScoreboard !== -1) {
    let userSelectedName = promptUserForName();
    if (userSelectedName === undefined || userSelectedName === "") {
      userSelectedName = "Anonymous" + Number(currentanonymous + 1);
      // anonymous user is now true so that later on the number of anonymous users gets incremented in db
      anonymoususer = true;
    }

    //0 and 1 mix; index on array (0-4) and placement differ (1-5) by 1
    const firstPlayerToChangeScore = madeItToScoreboard + 1;
    const totalNumberPlayerToChange = 6 - firstPlayerToChangeScore;
    for (let i = 0; i < totalNumberPlayerToChange; i++) {
      //update array of winners starting with the current player
      if (i === 0) {
        copyOriginalPlayerArray[
          firstPlayerToChangeScore + (i - 1)
        ].name = userSelectedName;
        copyOriginalPlayerArray[
          firstPlayerToChangeScore + (i - 1)
        ].time = newplayerScore;
        copyOriginalPlayerArray[
          firstPlayerToChangeScore + (i - 1)
        ].userindb = userid;
      } else {
        //copy what was on the old array of winners at the previous index
        copyOriginalPlayerArray[firstPlayerToChangeScore + (i - 1)].name =
          copyofcopy[firstPlayerToChangeScore + (i - 1) - 1].name;
        copyOriginalPlayerArray[firstPlayerToChangeScore + (i - 1)].time =
          copyofcopy[firstPlayerToChangeScore + (i - 1) - 1].time;
        copyOriginalPlayerArray[firstPlayerToChangeScore + (i - 1)].userindb =
          copyofcopy[firstPlayerToChangeScore + (i - 1) - 1].userindb;
      }
    }
    return [true, copyOriginalPlayerArray, anonymoususer];
  } else {
    return [false, copyOriginalPlayerArray, anonymoususer];
  }
};

// if the user resizes the window, recalculates character's locations and updates db
const reCalculateLocationsOnResize = async function () {
  if (getAuth().currentUser === null) {
    return;
  }
  const currentuser = getAuth().currentUser.uid;
  const docRef = doc(getFirestore(), "users", currentuser);
  try {
    await updateDoc(docRef, {
      "waldoLocation.location": calculateLocations("waldo"),
      "odlawLocation.location": calculateLocations("odlaw"),
      "wendaLocation.location": calculateLocations("wenda"),
      "wizardLocation.location": calculateLocations("wizard"),
      "woofLocation.location": calculateLocations("woof"),
    });
    //removes existing dom styling for found characters and updates dom at the new locations
    const allcircles = document.querySelectorAll(".characterfoundcircle");
    allcircles.forEach((div) => div.remove());
    const docSnap = await getDoc(docRef);
    updateDomAfterRefresh(docSnap.data());
  } catch (error) {
    console.log("Couldn't update doc in database ", error);
  }
};

// loads high scores board by first fetching the current players on board from db
const highestScoresLink = function () {
  const highestscorespara = document.getElementById("highestscoreslink");
  highestscorespara.addEventListener("click", async function () {
    const docRefScoreboard = doc(getFirestore(), "scoreboard", "scoredata");
    const docSnapScoreboard = await getDoc(docRefScoreboard);
    if (docSnapScoreboard.exists()) {
      const scoreboarddata = docSnapScoreboard.data();
      const currentPlayersInScoreboard = scoreboarddata["players"];
      displayScoreboard(null, currentPlayersInScoreboard, null);
      const closebutton = document.getElementById("closescoreboardbutton");
      const overlaydiv = document.getElementById("scoreboarddiv");
      closebutton.addEventListener("click", () => {
        overlaydiv.remove();
      });
    }
  });
};

// deep copy function of array of objects
const copyArrayValues = function (arrayOfObjects) {
  let resultingarray = [];
  for (let i = 0; i < arrayOfObjects.length; i++) {
    const oldobj = arrayOfObjects[i];
    const objname = oldobj.name;
    const objtime = oldobj.time;
    const objalias = oldobj.alias;
    const objuserindb = oldobj.userindb;
    const makenewobj = {
      name: objname,
      time: objtime,
      alias: objalias,
      userindb: objuserindb,
    };
    resultingarray.push(makenewobj);
  }
  return resultingarray;
};

const loginbutton = document.getElementById("login");
loginbutton.addEventListener("click", signIn);

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);
initFirebaseAuth();

window.onresize = reCalculateLocationsOnResize;

export default checkIfSelectedCharacterIsCorrect;
