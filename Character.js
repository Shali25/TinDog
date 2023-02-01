class Character {
  constructor(data) {
    Object.assign(this, data);
  }

  getDogHtml() {
    const { avatar, name, age, bio, hasBeenSwiped, hasBeenLiked } = this;

    let decisionHtml = "";

    if (hasBeenSwiped && hasBeenLiked) {
      decisionHtml = `<img class="like-img" src="images/like-image.png"/>`;
    } else if (hasBeenSwiped && !hasBeenLiked) {
      decisionHtml = `<img class="nope-img" src="images/nope-image.png"/>`;
    } else {
      decisionHtml = ``;
    }

    return `
          <div class="container">
            <img class="dog-avatar" src="${avatar}"/>
            <div class="decision-icon">${decisionHtml}</div>
            <div class="name-age">${name}, ${age}</div>
            <div class="bio">${bio}</div>
          <div>
          `;
  }
}

export default Character;
