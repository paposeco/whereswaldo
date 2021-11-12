import checkIfSelectedCharacterIsCorrect from "./index.js";
import waldoThumbnail from "./images/waldothumbnail.jpg";
import odlawThumbnail from "./images/odlawthumbnail.jpg";
import wendaThumbnail from "./images/wendathumbnail.jpg";
import wizardThumbnail from "./images/wizardthumbnail.jpeg";
import woofThumbnail from "./images/woofthumbnail.jpg";
import { getAuth } from "firebase/auth";

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

const addImagesToGame = function () {
  const sidethumbnailsdiv = document.getElementById("sidethumbnails");
  const sidetitle = document.createElement("h3");
  sidetitle.textContent = "Characters";
  sidethumbnailsdiv.appendChild(sidetitle);
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
    const charactername = document.createElement("h4");
    charactername.textContent = allCharacters[i].name;
    img.src = allCharacters[i].file;
    img.alt = allCharacters[i].alias;
    img.setAttribute("class", "characterthumbnailgame");
    div.appendChild(charactername);
    div.appendChild(img);
    sidethumbnailsdiv.appendChild(div);
  }
};

const createDropDown = function (event) {
  const img = document.getElementById("backgroundimage");
  const backgroundiv = document.getElementById("background");
  const imgwidth = Number(img.clientWidth);
  const backgrounddivwidth = Number(backgroundiv.clientWidth);
  const gamestatusdiv = document.getElementById("gamestatus");
  let leftmargin = 0;
  if (backgrounddivwidth > imgwidth) {
    leftmargin =
      backgrounddivwidth - imgwidth + Number(gamestatusdiv.clientWidth);
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
      checkIfSelectedCharacterIsCorrect(clickLocation, anotherevent.target);
      div.remove();
    });
  }
  closediv.addEventListener("click", () => {
    div.remove();
  });

  background.appendChild(div);
  div.appendChild(closediv);
  div.appendChild(ul);
};

//on resize doesn't draw on the correct place
const drawCircleAroundCharacter = function (coordx, coordy, character) {
  const img = document.getElementById("backgroundimage");
  const backgroundiv = document.getElementById("background");
  const imgwidth = Number(img.clientWidth);
  const backgrounddivwidth = Number(backgroundiv.clientWidth);
  const gamestatusdiv = document.getElementById("gamestatus");
  let leftmargin = 0;
  if (backgrounddivwidth > imgwidth) {
    leftmargin =
      backgrounddivwidth - imgwidth + Number(gamestatusdiv.clientWidth);
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
  background.appendChild(div);
};

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
};

const createPrettyAlert = function (eventtarget) {
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
  para.textContent = `You found ${currentcharacter.name}!`;
  annoucementdiv.appendChild(para);
  gamediv.appendChild(overlaydiv);
};

const promptUserForName = function () {
  const username = window.prompt(
    "Congratulations, you made it to the scoreboard! What should we call you?"
  );
  return username;
};

const displayScoreboard = function (scoreboardarray) {
  const overlaydiv = document.createElement("div");
  const gamediv = document.getElementById("game");
  overlaydiv.setAttribute("id", "scoreboarddiv");
  const buttondiv = document.createElement("div");
  buttondiv.setAttribute("id", "closescoreboarddiv");
  const button = document.createElement("button");
  button.innerHTML = "x";
  buttondiv.appendChild(button);
  const annoucementdiv = document.createElement("div");
  const title = document.createElement("h2");
  title.textContent = "Best Five Players";
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");

  for (let i = 0; i < scoreboardarray.length; i++) {
    if (scoreboardarray[i].name === "") {
      break;
    }
    const newrow = document.createElement("tr");
    const placement = i + 1 + ".";
    const playername = scoreboardarray[i].name;
    const playerscore = scoreboardarray[i].time;
    const tdPlacement = document.createElement("td");
    const tdPlacementText = document.createTextNode(placement);
    tdPlacement.appendChild(tdPlacementText);
    const tdName = document.createElement("td");
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
  annoucementdiv.appendChild(title);
  annoucementdiv.appendChild(table);
  overlaydiv.appendChild(buttondiv);
  overlaydiv.appendChild(annoucementdiv);
  gamediv.appendChild(overlaydiv);
};

export {
  createDropDown,
  drawCircleAroundCharacter,
  addImagesToStartPage,
  addImagesToGame,
  updateStatusSideBar,
  createPrettyAlert,
  promptUserForName,
  displayScoreboard,
};
