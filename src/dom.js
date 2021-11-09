import checkIfSelectedCharacterIsCorrect from "./index.js";

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
  const background = document.getElementById("background");
  const div = document.createElement("div");
  div.style.position = "absolute";
  div.style.width = "20px";
  div.style.height = "20px";
  div.style.border = "2px solid red";
  div.style.borderRadius = "25px";
  div.style.top = coordy - 5 + "px";
  div.style.left = coordx + 50 + "px";
  div.style.zIndex = "1";
  div.setAttribute("id", character + "Found");
  background.appendChild(div);
};

export { createDropDown, drawCircleAroundCharacter };
