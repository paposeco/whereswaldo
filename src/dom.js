import checkIfSelectedCharacterIsCorrect from "./index.js";
import waldoThumbnail from "./images/waldothumbnail.jpg";
import odlawThumbnail from "./images/odlawthumbnail.jpg";
import wendaThumbnail from "./images/wendathumbnail.jpg";
import wizardThumbnail from "./images/wizardthumbnail.jpeg";
import woofThumbnail from "./images/woofthumbnail.jpg";
import BackgroundImage from "./images/waldo.jpeg";
import { getAuth } from "firebase/auth";

// loads characters' images to start page
const addImagesToStartPage = function () {
  if (getAuth().currentUser !== null) {
    return;
  }
  const charactersDiv = document.getElementById("charactersToLookFor");
  const allCharacters = [
    { name: "waldothumbnail", file: waldoThumbnail },
    { name: "odlawthumbnail", file: odlawThumbnail },
    { name: "wendathumbnail", file: wendaThumbnail },
    { name: "wizardthumbnail", file: wizardThumbnail },
    { name: "woofthumbnail", file: woofThumbnail },
  ];
  for (let i = 0; i < allCharacters.length; i++) {
    const img = document.createElement("img");
    img.src = allCharacters[i].file;
    img.alt = allCharacters[i].name;
    img.setAttribute("class", "characterthumbnail");
    charactersDiv.appendChild(img);
  }
};

// loads background image and sets critical style; if styled with css, the character's locations would be incorrect on db
const displayImage = function () {
  const background = document.getElementById("background");
  background.style.width = "100%";
  const img = document.createElement("img");
  img.src = BackgroundImage;
  img.alt = "backgroundimage";
  img.setAttribute("id", "backgroundimage");
  img.style.display = "block";
  img.style.maxHeight = "100%";
  img.style.maxWidth = "100%";
  img.style.margin = "0 auto";
  background.appendChild(img);
  // clicking on image pops up a list of all characters
  img.addEventListener("click", (event) => {
    createDropDown(event);
  });
  return "done";
};

// loads characters' images to game and creates high scores button
const addImagesToGame = function () {
  const sidethumbnailsdiv = document.getElementById("sidethumbnails");
  const allCharacters = [
    { alias: "waldothumbnail", file: waldoThumbnail, name: "Waldo" },
    { alias: "odlawthumbnail", file: odlawThumbnail, name: "Odlaw" },
    { alias: "wendathumbnail", file: wendaThumbnail, name: "Wenda" },
    {
      alias: "wizardthumbnail",
      file: wizardThumbnail,
      name: "Wizard Whitebeard",
    },
    { alias: "woofthumbnail", file: woofThumbnail, name: "Woof" },
  ];
  for (let i = 0; i < allCharacters.length; i++) {
    const div = document.createElement("div");
    div.setAttribute("class", "divcharacterthumbnail");
    div.setAttribute("id", allCharacters[i].alias);
    const img = document.createElement("img");
    img.src = allCharacters[i].file;
    img.alt = allCharacters[i].alias;
    img.setAttribute("class", "characterthumbnailgame");
    div.appendChild(img);
    sidethumbnailsdiv.appendChild(div);
  }
  const highscorebutton = document.createElement("button");
  highscorebutton.textContent = "Highest Scores";
  highscorebutton.setAttribute("id", "highestscoreslink");
  sidethumbnailsdiv.appendChild(highscorebutton);
};

// creates a list of all characters when user clicks the background image; each element on the list has an event listener for selecting the character
const createDropDown = function (event) {
  const img = document.getElementById("backgroundimage");
  const backgrounddiv = document.getElementById("background");
  const imgwidth = Number(img.clientWidth);
  const backgrounddivwidth = Number(backgrounddiv.clientWidth);
  let leftmargin = 0;
  // the list is placed at the right of the click location
  if (backgrounddivwidth > imgwidth) {
    leftmargin = (backgrounddivwidth - imgwidth) / 2;
  }

  if (document.getElementById("characterselection") !== null) {
    document.getElementById("characterselection").remove();
  }
  const div = document.createElement("div");
  div.setAttribute("id", "characterselection");
  const closediv = document.createElement("button");
  closediv.innerHTML = "x";
  let topoffset = event.offsetY - 20 - 320 + "px";
  const extractnumberfromtopoffset = topoffset.split("p")[0];
  if (extractnumberfromtopoffset < 0) {
    topoffset = "10px";
  }
  div.style.top = topoffset;
  div.style.left = event.offsetX + leftmargin + 20 + "px";
  const ul = document.createElement("ul");
  const liwaldo = document.createElement("li");
  liwaldo.textContent = "Waldo";
  liwaldo.setAttribute("data-character", "waldoLocation");
  const liodlaw = document.createElement("li");
  liodlaw.textContent = "Odlaw";
  liodlaw.setAttribute("data-character", "odlawLocation");
  const liwenda = document.createElement("li");
  liwenda.textContent = "Wenda";
  liwenda.setAttribute("data-character", "wendaLocation");
  const liwhitebeard = document.createElement("li");
  liwhitebeard.textContent = "Wizard Whitebeard";
  liwhitebeard.setAttribute("data-character", "wizardLocation");
  const liwoof = document.createElement("li");
  liwoof.textContent = "Woof";
  liwoof.setAttribute("data-character", "woofLocation");

  ul.appendChild(liwaldo);
  ul.appendChild(liodlaw);
  ul.appendChild(liwenda);
  ul.appendChild(liwhitebeard);
  ul.appendChild(liwoof);
  const clickLocation = [event.offsetX, event.offsetY];
  const characters = [liwaldo, liodlaw, liwenda, liwhitebeard, liwoof];
  for (let i = 0; i < characters.length; i++) {
    characters[i].addEventListener("click", (anotherevent) => {
      // checks if the user selected the correct character from the list
      checkIfSelectedCharacterIsCorrect(clickLocation, anotherevent.target);
      div.remove();
    });
  }
  closediv.addEventListener("click", () => {
    div.remove();
  });

  backgrounddiv.appendChild(div);
  div.appendChild(closediv);
  div.appendChild(ul);
};

// draws a black circle around the clicked spot if a character was found
const drawCircleAroundCharacter = function (coordx, coordy, character) {
  const img = document.getElementById("backgroundimage");
  const backgroundiv = document.getElementById("background");
  const imgwidth = Number(img.clientWidth);
  const backgrounddivwidth = Number(backgroundiv.clientWidth);
  let leftmargin = 0;
  if (backgrounddivwidth > imgwidth) {
    leftmargin = (backgrounddivwidth - imgwidth) / 2;
  }
  const div = document.createElement("div");
  div.style.position = "absolute";
  div.style.width = "40px";
  div.style.height = "40px";
  div.style.border = "3px solid black";
  div.style.borderRadius = "25px";
  div.style.top = coordy - 20 + "px";
  div.style.left = leftmargin + coordx - 20 + "px";
  div.style.zIndex = "1";
  div.setAttribute("id", character + "Found");
  div.setAttribute("class", "characterfoundcircle");
  backgroundiv.appendChild(div);
};

// styles the characters images differently when a character is found
const updateStatusSideBar = function (datasetcharacter) {
  const allCharacters = [
    { setname: "waldoLocation", aliasondiv: "waldothumbnail" },
    { setname: "odlawLocation", aliasondiv: "odlawthumbnail" },
    { setname: "wendaLocation", aliasondiv: "wendathumbnail" },
    { setname: "wizardLocation", aliasondiv: "wizardthumbnail" },
    { setname: "woofLocation", aliasondiv: "woofthumbnail" },
  ];
  const findcharactername = allCharacters.find(
    (element) => element.setname === datasetcharacter
  );
  const characterdivondom = document.getElementById(
    findcharactername.aliasondiv
  );
  characterdivondom.classList.add("found");
  const div = document.createElement("div");
  div.setAttribute("class", "check");
  const para = document.createElement("p");
  para.innerHTML = '<i class="las la-check"></i>';
  div.appendChild(para);
  characterdivondom.appendChild(div);
};

// creates an overlay to notify the user if a character was found or not
const createPrettyAlert = function (characterfound, eventtarget) {
  const overlaydiv = document.createElement("div");
  const gamediv = document.getElementById("game");
  overlaydiv.setAttribute("id", "foundoverlay");
  const buttondiv = document.createElement("div");
  buttondiv.setAttribute("id", "closeoverlay");
  const annoucementdiv = document.createElement("div");
  overlaydiv.appendChild(buttondiv);
  overlaydiv.appendChild(annoucementdiv);
  const closebutton = document.createElement("button");
  closebutton.innerHTML = "x";
  buttondiv.appendChild(closebutton);
  closebutton.addEventListener("click", () => {
    overlaydiv.remove();
  });
  const para = document.createElement("p");
  if (characterfound) {
    const allCharacters = [
      { setname: "waldoLocation", name: "Waldo" },
      { setname: "odlawLocation", name: "Odlaw" },
      { setname: "wendaLocation", name: "Wenda" },
      { setname: "wizardLocation", name: "Wizard Whitebeard" },
      { setname: "woofLocation", name: "Woof" },
    ];
    const foundCharacter = eventtarget.dataset.character;
    const currentcharacter = allCharacters.find(
      (element) => element.setname === foundCharacter
    );

    para.textContent = `You found ${currentcharacter.name}!`;
  } else {
    para.textContent = "The selected character isn't at that location.";
  }

  annoucementdiv.appendChild(para);
  gamediv.appendChild(overlaydiv);
  setTimeout(() => {
    overlaydiv.remove();
  }, 2500);
};

// prompts the user to provide a name if the user has a winning score; the username is restricted to 12 characters
const promptUserForName = function () {
  let username = window.prompt(
    "Congratulations, you made it to the scoreboard! What should we call you? (max 12 characters)"
  );
  if (username.length > 12) {
    username = username.substring(0, 12);
  }
  return username;
};

// creates a table with the current high scores
const displayScoreboard = function (
  playerHasHighScore,
  scoreboardarray,
  currentuserscore
) {
  let message = "";
  if (currentuserscore === null) {
    message = "";
  } else {
    if (playerHasHighScore) {
      message = "Congratulations! You made it to the High Score board!";
    } else {
      message = `You were too slow. It took you ${currentuserscore} seconds to find everyone.`;
    }
  }
  const overlaydiv = document.createElement("div");
  const gamediv = document.getElementById("game");
  overlaydiv.setAttribute("id", "scoreboarddiv");
  const buttondiv = document.createElement("div");
  buttondiv.setAttribute("id", "closescoreboarddiv");
  const button = document.createElement("button");
  button.setAttribute("id", "closescoreboardbutton");
  button.innerHTML = "x";
  buttondiv.appendChild(button);
  button.addEventListener("click", () => {
    overlaydiv.remove();
  });
  const annoucementdiv = document.createElement("div");
  const playerScore = document.createElement("p");
  playerScore.setAttribute("id", "playermessage");
  playerScore.textContent = message;
  const title = document.createElement("h2");
  title.textContent = "Best Five Players";
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");

  for (let i = 0; i < scoreboardarray.length; i++) {
    const newrow = document.createElement("tr");
    const placement = i + 1 + ".";
    const tdPlacement = document.createElement("td");
    const tdPlacementText = document.createTextNode(placement);
    tdPlacement.appendChild(tdPlacementText);
    const tdName = document.createElement("td");

    let playername;
    let playerscore;
    if (scoreboardarray[i].name === "") {
      playername = "";
      playerscore = "";
    } else {
      playername = scoreboardarray[i].name;
      playerscore = scoreboardarray[i].time;
    }
    const tdNameText = document.createTextNode(playername);
    tdName.appendChild(tdNameText);
    const tdScore = document.createElement("td");
    const tdScoreText = document.createTextNode(playerscore);
    tdScore.appendChild(tdScoreText);
    newrow.appendChild(tdPlacement);
    newrow.appendChild(tdName);
    newrow.appendChild(tdScore);
    tbody.appendChild(newrow);
  }
  table.appendChild(tbody);
  annoucementdiv.appendChild(playerScore);
  annoucementdiv.appendChild(title);
  annoucementdiv.appendChild(table);
  overlaydiv.appendChild(buttondiv);
  overlaydiv.appendChild(annoucementdiv);
  gamediv.appendChild(overlaydiv);
};

// if the user refreshed the page ou closed the tab, restyles page to match characters found
const updateDomAfterRefresh = function (data) {
  const numberoffoundcharacters = data.foundcharacters;
  const allcharacters = [
    { name: "waldoLocation", characterdata: data.waldoLocation },
    { name: "odlawLocation", characterdata: data.odlawLocation },
    { name: "wendaLocation", characterdata: data.wendaLocation },
    { name: "wizardLocation", characterdata: data.wizardLocation },
    { name: "woofLocation", characterdata: data.woofLocation },
  ];
  let foundcharacters = 0;
  for (let i = 0; i < allcharacters.length; i++) {
    if (allcharacters[i].characterdata.found) {
      foundcharacters++;
      const charactersLocation = allcharacters[i].characterdata.location;
      const coordx =
        Number(charactersLocation.minwidth) -
        2 +
        (Number(charactersLocation.maxwidth) -
          Number(charactersLocation.minwidth)) /
          2;
      const coordy =
        Number(charactersLocation.minheight) -
        4 +
        (Number(charactersLocation.maxheight) -
          Number(charactersLocation.minheight)) /
          2;
      drawCircleAroundCharacter(coordx, coordy, allcharacters[i].name);
      updateStatusSideBar(allcharacters[i].name);
      if (foundcharacters === numberoffoundcharacters) {
        break;
      }
    }
  }
};

export {
  drawCircleAroundCharacter,
  addImagesToStartPage,
  addImagesToGame,
  updateStatusSideBar,
  createPrettyAlert,
  promptUserForName,
  displayScoreboard,
  displayImage,
  updateDomAfterRefresh,
};
