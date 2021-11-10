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
  let leftmargin = 0;
  if (backgrounddivwidth > imgwidth) {
    //only works if backgroundimage is centered
    leftmargin = (backgrounddivwidth - imgwidth) / 2;
  }
  //need to decide on info placement before determing best way to identify characters
  console.log(img.clientWidth, backgroundiv.clientWidth);
  const background = document.getElementById("background");
  const div = document.createElement("div");
  div.style.position = "absolute";
  div.style.width = "30px";
  div.style.height = "30px";
  div.style.border = "2px solid red";
  div.style.borderRadius = "25px";
  div.style.top = coordy - 5 + "px";
  div.style.left = leftmargin + coordx - 15 + "px";
  div.style.zIndex = "1";
  div.setAttribute("id", character + "Found");
  background.appendChild(div);
};

export { createDropDown, drawCircleAroundCharacter, addImagesToStartPage };
//1693 1908
