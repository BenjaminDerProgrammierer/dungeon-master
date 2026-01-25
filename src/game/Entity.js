export class Entity {
  ref;
  position; // x, y
  size; // x, y

  constructor(container, position, size) {
    this.position = position;
    this.size = size || { x: 20, y: 20 };

    this.ref = document.createElement("div");
    this.ref.classList.add("entity");
    container.appendChild(this.ref);

    this.redraw();
  }

  move(dx, dy) {
    this.position.x += dx;
    this.position.y += dy;
    this.redraw();
  }

  redraw() {
    this.ref.style.left = `${this.position.x}px`;
    this.ref.style.top = `${this.position.y}px`;
    this.ref.style.left = `${this.position.x}px`;
    this.ref.style.top = `${this.position.y}px`;
    this.ref.style.width = `${this.size.x}px`;
    this.ref.style.height = `${this.size.y}px`;
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
