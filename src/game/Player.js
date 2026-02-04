import config from "../config.js";
import Entity from "./Entity.js";

export default class Player extends Entity {
    spritesheet;
    spritesheetFrame = 0;
    spritesheetImgRef;

    constructor(container) {
        super(container, config.startPosition, config.playerSize, config.playerScale);
        this.ref.classList.add("spritesheetBox");

        this.swapperRef = document.createElement('div');
        this.ref.appendChild(this.swapperRef)

        this.spritesheetImgRef = document.createElement('img');
        this.spritesheetImgRef.alt = "spritesheet";
        this.swapperRef.appendChild(this.spritesheetImgRef);

        // Set starting position
        this.ref.style.left = `${config.startPosition.x}px`;
        this.ref.style.top = `${config.startPosition.y}px`;
    }

    move(distance) {
        if (Math.abs(distance.x) + Math.abs(distance.y) == 0) return;

        let direction;
        if (distance.x < 0) {
            direction = -1;
        } else {
            direction = 1;
        }
        this.swapperRef.style.transform = `scaleX(${direction})`;
        super.move(distance.x, distance.y, { y: config.playerScale, x: config.playerScale }, direction);
    }

    /**
     * Animate the player based on his speed
     * @param {number} speed 
     */
    animate(speed) {
        speed = Math.abs(speed.x);
        if (speed > 0) {
            this.spritesheet = config.spritesheets.walking;
        } else {
            this.spritesheet = config.spritesheets.idle;
        }
        this.spritesheetImgRef.src = this.spritesheet.src;

        this.spritesheetFrame++;
        if (this.spritesheetFrame > this.spritesheet.frameCount) {
            this.spritesheetFrame = 0;
        }

        this.spritesheetImgRef.style.right = (this.spritesheetFrame * this.spritesheet.frameWidth) + "px";
    }
}