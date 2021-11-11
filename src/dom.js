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
  if (document.getElementById("characterselection") !== null) {
    document.getElementById("characterselection").remove();
  }
  const div = document.createElement("div");
  div.setAttribute("id", "characterselection");
  const marginleft =
    (Number(document.documentElement.clientWidth) - Number(img.clientWidth)) /
    2;
  div.style.top = event.offsetY - 50 + "px";
  div.style.left = event.offsetX + marginleft + 20 + "px";
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
  let selectedCharacter;
  const clickLocation = [event.offsetX, event.offsetY];
  console.log(event.offsetX, event.offsetY);
  const characters = [liwaldo, liodlaw, liwenda, liwhitebeard, liwoof];
  for (let i = 0; i < characters.length; i++) {
    characters[i].addEventListener("click", (anotherevent) => {
      checkIfSelectedCharacterIsCorrect(clickLocation, anotherevent.target);
      div.remove();
    });
  }

  background.appendChild(div);
  div.appendChild(ul);
};

//need to calculate img.clientwidth and window.clientwidth and try to find a way to calculate where div should be placed

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
  const background = document.getElementById("background");
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
  const currentwidth = gamediv.clientWidth;
  const currentheight = gamediv.clientHeight;
  overlaydiv.setAttribute("id", "foundoverlay");
  // overlaydiv.style.top = currentheight - overlaydiv.height / 2;
  // overlaydiv.style.left = currentwidth - overlaydiv.width / 2;
  const para = document.createElement("p");
  para.textContent = `You found ${currentcharacter.name}!`;
  overlaydiv.appendChild(para);
  gamediv.appendChild(overlaydiv);
};

export {
  createDropDown,
  drawCircleAroundCharacter,
  addImagesToStartPage,
  addImagesToGame,
  updateStatusSideBar,
  createPrettyAlert,
};
