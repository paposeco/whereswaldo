import "./style/style.css";
import BackgroundImage from "./images/waldo.jpeg";

const background = document.getElementById("background");

const img = document.createElement("img");

img.src = BackgroundImage;
img.alt = "backgroundimage";
img.setAttribute("id", "backgroundimage");

background.appendChild(img);

// console.log("x: " + event.offsetX);
// console.log("y: " + event.offsetY);
// console.log("image width: " + img.clientWidth);
// console.log("image height: " + img.clientHeight);

const clickedWhichCharac = function (coordx, coordy) {
  let waldoLocationMinWidth = Math.ceil(0.3963 * Number(img.clientWidth));
  let waldoLocationMaxWidth = Math.ceil(0.4123 * Number(img.clientWidth));
  let waldoLocationMinHeight = Math.ceil(0.5879 * Number(img.clientHeight));
  let waldoLocationMaxHeight = Math.ceil(0.6352 * Number(img.clientHeight));

  let odlawLocationMinWidth = Math.ceil(0.062 * Number(img.clientWidth));
  let odlawLocationMaxWidth = Math.ceil(0.077 * Number(img.clientWidth));
  let odlawLocationMinHeight = Math.ceil(0.6616 * Number(img.clientHeight));
  let odlawLocationMaxHeight = Math.ceil(0.6928 * Number(img.clientHeight));

  let wendaLocationMinWidth = Math.ceil(0.2888 * Number(img.clientWidth));
  let wendaLocationMaxWidth = Math.ceil(0.3006 * Number(img.clientWidth));
  let wendaLocationMinHeight = Math.ceil(0.4764 * Number(img.clientHeight));
  let wendaLocationMaxHeight = Math.ceil(0.5359 * Number(img.clientHeight));

  let wizardLocationMinWidth = Math.ceil(0.7743 * Number(img.clientWidth));
  let wizardLocationMaxWidth = Math.ceil(0.7897 * Number(img.clientWidth));
  let wizardLocationMinHeight = Math.ceil(0.5369 * Number(img.clientHeight));
  let wizardLocationMaxHeight = Math.ceil(0.5898 * Number(img.clientHeight));

  let woofLocationMinWidth = Math.ceil(0.5823 * Number(img.clientWidth));
  let woofLocationMaxWidth = Math.ceil(0.5936 * Number(img.clientWidth));
  let woofLocationMinHeight = Math.ceil(0.9007 * Number(img.clientHeight));
  let woofLocationMaxHeight = Math.ceil(0.9105 * Number(img.clientHeight));

  if (
    coordx >= waldoLocationMinWidth &&
    coordx <= waldoLocationMaxWidth &&
    coordy >= waldoLocationMinHeight &&
    coordy <= waldoLocationMaxHeight
  ) {
    //  alert("You found Waldo!");
    return "waldo";
  } else if (
    coordx >= odlawLocationMinWidth &&
    coordx <= odlawLocationMaxWidth &&
    coordy >= odlawLocationMinHeight &&
    coordy <= odlawLocationMaxHeight
  ) {
    //    alert("You found Odlaw!");
    return "odlaw";
  } else if (
    coordx >= wendaLocationMinWidth &&
    coordx <= wendaLocationMaxWidth &&
    coordy >= wendaLocationMinHeight &&
    coordy <= wendaLocationMaxHeight
  ) {
    //  alert("You found Wenda!");
    return "wenda";
  } else if (
    coordx >= wizardLocationMinWidth &&
    coordx <= wizardLocationMaxWidth &&
    coordy >= wizardLocationMinHeight &&
    coordy <= wizardLocationMaxHeight
  ) {
    //   alert("You found Wizard Whitebeard!");
    return "wizard";
  } else if (
    coordx >= woofLocationMinWidth &&
    coordx <= woofLocationMaxWidth &&
    coordy >= woofLocationMinHeight &&
    coordy <= woofLocationMaxHeight
  ) {
    // alert("You found Woof!");
    return "woof";
  }
};

img.addEventListener("click", (event) => {
  const character = clickedWhichCharac(event.offsetX, event.offsetY);
  createDropDown(event);
});

const createDropDown = function (event) {
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
  const liodlaw = document.createElement("li");
  liodlaw.textContent = "Odlaw";
  const liwenda = document.createElement("li");
  liwenda.textContent = "Wenda";
  const liwhitebeard = document.createElement("li");
  liwhitebeard.textContent = "Wizard Whitebeard";
  const liwoof = document.createElement("li");
  liwoof.textContent = "Woof";

  ul.appendChild(liwaldo);
  ul.appendChild(liodlaw);
  ul.appendChild(liwenda);
  ul.appendChild(liwhitebeard);
  ul.appendChild(liwoof);
  let selectedCharacter;
  const characters = [liwaldo, liodlaw, liwenda, liwhitebeard, liwoof];
  for (let i = 0; i < characters.length; i++) {
    characters[i].addEventListener(
      "click",
      () => {
        selectedCharacter = characters[i].textContent;
        div.remove();
      }
      //
      // save selected character on list somewhere
    );
  }

  background.appendChild(div);
  div.appendChild(ul);
};
