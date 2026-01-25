export class Entity {
  ref;
  position; // x, y
  size; // x, y

  constructor(container, position, size, scale = 1) {
    this.position = position;
    this.size = size || { x: 20, y: 20 };
    this.scale = {x: scale, y: scale };

    this.ref = document.createElement("div");
    this.ref.classList.add("entity");
    container.appendChild(this.ref);

    this.redraw();
  }

  move(dx, dy, scale) {
    this.position.x += dx;
    this.position.y += dy;
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
    return (
      this.position.x < other.position.x + other.width &&
      this.position.x + this.width > other.position.x &&
      this.position.y < other.position.y + other.height &&
      this.position.y + this.height > other.position.y
    );
  }
}
