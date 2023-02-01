import dogsData from "./data.js";
import Character from "./Character.js";

let dog = getNewDog();
let isWaiting = false;

let likedProfiles = [];

render();

function getNewDog() {
  const nextDogProfile = dogsData.shift();
  return nextDogProfile ? new Character(nextDogProfile) : {};
}

function delayNextDog() {
  setTimeout(() => {
    isWaiting = false;
    dog = getNewDog();
    render();
  }, 500);
}

function nope() {
  if (!isWaiting) {
    dog.hasBeenSwiped = true;
    dog.hasBeenLiked = false;
    isWaiting = true;
    render();
    delayNextDog();
  }
}

function like() {
  if (!isWaiting) {
    dog.hasBeenSwiped = true;
    dog.hasBeenLiked = true;
    isWaiting = true;
    render();
    delayNextDog();
    likedProfiles.push(dog.avatar);
  }
}

function render() {
  if (Object.keys(dog).length) {
    document.getElementById("main-section").innerHTML = dog.getDogHtml();
  } else {
    isWaiting = true;
    endMessage();
  }
}

function endMessage() {
  let imgElements = "";

  likedProfiles.forEach(
    (profile) =>
      (imgElements += `<img src=${profile} class="renderLikedDogsArray" />`)
  );

  document.getElementById("main-section").innerHTML = `
  <div class="end-message">You like ${likedProfiles.length} dogs!</div>
  <div class="elements-container">${imgElements}</div>
  <button id="reset-btn">Keep Sniffing!</button>
  `;

  document.getElementById("reset-btn").addEventListener("click", reset);
}

function reset() {
  likedProfiles = [];
  location.reload();
}

document.getElementById("nope-btn").addEventListener("click", nope);
document.getElementById("like-btn").addEventListener("click", like);
