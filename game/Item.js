import { CONFIG } from "../config";
import { Entity } from "./Entity";

export class Item extends Entity {
    texture;

    constructor(container) {
        super(container, {x: 100, y: 100}, CONFIG.itemSize, CONFIG.itemScale);
        this.texture = "craftpix-556112-free-crystals-2d-game-items/PNG/shiny/4.png"
        this.redraw();
    }

    redraw() {
        this.ref.style.backgroundImage = `url(${this.texture})`;
        super.redraw();
    }

    moveTo(position) {
        this.position = position;
        this.redraw();
    }

    moveToRandom() {
        this.moveTo({
            x: Math.floor(Math.random() * (window.innerWidth - this.size.x)),
            y: Math.floor(Math.random() * (window.innerHeight - this.size.y))
        });
    }
}