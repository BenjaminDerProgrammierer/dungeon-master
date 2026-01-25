import { CONFIG } from "../config";
import { Entity } from "./Entity";

export class Player extends Entity {
    spritesheet;
    spritesheetFrame = 0;
    spritesheetImgRef;

    constructor(container) {
        super(container, CONFIG.startPosition, CONFIG.playerSize, CONFIG.playerScale);
        this.ref.classList.add("spritesheetBox");

        this.spritesheetImgRef = document.createElement('img');
        this.spritesheetImgRef.alt = "spritesheet";
        this.ref.appendChild(this.spritesheetImgRef);

        // Set starting position
        this.ref.style.left = `${CONFIG.startPosition.x}px`;
        this.ref.style.top = `${CONFIG.startPosition.y}px`;
    }

    move(distance) {
        if (Math.abs(distance.x) + Math.abs(distance.y) == 0) return;

        console.log("Moving player", distance);
        const scale = { y: CONFIG.playerScale };
        if (distance.x < 0) {
            scale.x = -CONFIG.playerScale;
        } else {
            scale.x = CONFIG.playerScale;
        }
        super.move(distance.x, distance.y, scale);
    }

    /**
     * Animate the player based on his speed
     * @param {number} speed 
     */
    animate(speed) {
        speed = Math.abs(speed.x);
        if (speed > 0) {
            this.spritesheet = CONFIG.spritesheets.walking;
        } else {
            this.spritesheet = CONFIG.spritesheets.idle;
        }
        this.spritesheetImgRef.src = this.spritesheet.src;

        this.spritesheetFrame++;
        if (this.spritesheetFrame > this.spritesheet.frameCount) {
            this.spritesheetFrame = 0;
        }

        this.spritesheetImgRef.style.right = (this.spritesheetFrame * this.spritesheet.frameWidth) + "px";
    }
}