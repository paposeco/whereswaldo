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
    alert("You found Waldo!");
  } else if (
    coordx >= odlawLocationMinWidth &&
    coordx <= odlawLocationMaxWidth &&
    coordy >= odlawLocationMinHeight &&
    coordy <= odlawLocationMaxHeight
  ) {
    alert("You found Odlaw!");
  } else if (
    coordx >= wendaLocationMinWidth &&
    coordx <= wendaLocationMaxWidth &&
    coordy >= wendaLocationMinHeight &&
    coordy <= wendaLocationMaxHeight
  ) {
    alert("You found Wenda!");
  } else if (
    coordx >= wizardLocationMinWidth &&
    coordx <= wizardLocationMaxWidth &&
    coordy >= wizardLocationMinHeight &&
    coordy <= wizardLocationMaxHeight
  ) {
    alert("You found Wizard Whitebeard!");
  } else if (
    coordx >= woofLocationMinWidth &&
    coordx <= woofLocationMaxWidth &&
    coordy >= woofLocationMinHeight &&
    coordy <= woofLocationMaxHeight
  ) {
    alert("You found Woof!");
  }
};

img.addEventListener("click", (event) => {
  clickedWhichCharac(event.offsetX, event.offsetY);
});
