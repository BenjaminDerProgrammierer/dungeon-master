export default class HeadUpDisplay {
  ref;

  constructor(container) {
    this.ref = document.createElement("div");
    this.ref.id = "hud";
    container.appendChild(this.ref);
    this.showInfo();
  }

  showInfo(score = 0) {
    this.ref.innerHTML = score;
  }
}
