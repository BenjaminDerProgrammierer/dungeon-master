import { CONFIG } from "../config.js";

export class Entity {
  ref;
  position; // x, y
  size; // x, y
  container;

  constructor(container, position, size, scale = 1) {
    this.container = container
    this.position = position;
    this.size = size || { x: 20, y: 20 };
    this.scale = { x: scale, y: scale };

    this.ref = document.createElement("div");
    this.ref.classList.add("entity");
    container.appendChild(this.ref);

    this.redraw();
  }

  move(dx, dy, scale) {
    this.position.x += dx;
    this.position.y += dy;

    const rect = this.container.getBoundingClientRect();
    const bounds = {
      left: 0,
      right: rect.right - this.ref.clientWidth * CONFIG.playerScale,
      top: 0,
      bottom: rect.bottom - this.ref.clientHeight * CONFIG.playerScale
    }

    if (this.position.x < bounds.left) {
      this.position.x = bounds.left;
    }

    if (this.position.x > bounds.right) {
      this.position.x = bounds.right;
    }

    if (this.position.y < bounds.top) {
      this.position.y = bounds.top;
    }

    if (this.position.y > bounds.bottom) {
      this.position.y = bounds.bottom;
    }

    this.scale.x = scale.x;
    this.scale.y = scale.y;
    this.redraw();
  }

  redraw() {
    this.ref.style.left = `${this.position.x}px`;
    this.ref.style.top = `${this.position.y}px`;
    this.ref.style.left = `${this.position.x}px`;
    this.ref.style.top = `${this.position.y}px`;
    this.ref.style.width = `${this.size.x}px`;
    this.ref.style.height = `${this.size.y}px`;
    this.ref.style.transform = `scaleX(${this.scale.x}) scaleY(${this.scale.y})`;
  }

  isCollidingWith(other) {
    // Center of other 
    const otherPos = {
      x: other.position.x + other.size.x * other.scale.x / 2,
      y: other.position.y + other.size.y * other.scale.y / 2
    }

    // Edges of this
    const thisAbsBottomCoordinate = this.position.y + this.size.y * this.scale.y;
    const thisAbsTopCoordinate = this.position.y;
    const thisAbsLeftCoordinate = this.position.x;
    const thisAbsRightCoordinate = this.position.x + this.size.x * this.scale.x;

    debugger

    return (
      otherPos.x < thisAbsRightCoordinate &&
      otherPos.x > thisAbsLeftCoordinate  &&
      otherPos.y < thisAbsBottomCoordinate &&
      otherPos.y > thisAbsTopCoordinate
    );
  }
}
