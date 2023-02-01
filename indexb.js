import dogsData from "./data.js";
import Character from "./Character.js";

// let dog = getNewDog();
let isWaiting = false; //prevents unnecessary clicks
let likedProfiles = [];

let dog = new Character(dogs[0]);
let currentDogIndex = 0;
let currentDog = new Character(dogs[currentDogIndex]);

function getNewDog() {
  currentDog = new Character(dogs[currentDogIndex]);
}

render();

function delayNextDog() {
  setTimeout(() => {
    isWaiting = false;
    dog = getNewDog();
    // this this point the swipe animations are switched off
    render();
  }, 500);
}

function nope() {
  if (!isWaiting) {
    dog.hasBeenSwiped = true;
    dog.hasBeenLiked = false;
    isWaiting = true;
    render();
    delayNextDog(); //to display next dog profile with delay
  }
}

function like() {
  if (!isWaiting) {
    dog.hasBeenSwiped = true;
    dog.hasBeenLiked = true;
    isWaiting = true;
    render();
    delayNextDog(); //to display next dog profile with delay
    likedProfiles.push(dog.avatar);
  }
}

function render() {
  if (dogsData.length) {
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
  render();
}

document.getElementById("nope-btn").addEventListener("click", nope);
document.getElementById("like-btn").addEventListener("click", like);

// const getLikedProfiles = likedProfiles.map((profile) => "src=" + profile);
// console.log(likedProfiles);
// console.log(getLikedProfiles);

// an alternative approach to incrementally moving through the array

// let dog = new Character(dogs[0]);
// let currentDogIndex = 0;
// let currentDog = new Character(dogs[currentDogIndex]);

// function getNewDog() {
//   if (currentDogIndex < dogs.length) {
//     currentDogIndex += 1;
//   } else {
//     console.log("end message works");
//     endMessage();
//   }
//   currentDog = new Character(dogs[currentDogIndex]);
// }

// function render() {
//   if (dogsData.length > 0) {
//     document.getElementById("main-section").innerHTML = dog.getDogHtml();
//   } else {
//     isWaiting = true;
//     endMessage();
//   }
// }
