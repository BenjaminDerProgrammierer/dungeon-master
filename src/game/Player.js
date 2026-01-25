import { CONFIG } from "../config";
import { Entity } from "./Entity";

export class Player extends Entity {
    spritesheet;
    spritesheetFrame = 0;
    spritesheetImgRef;
    frame = 0;

    constructor(container) {
        super(container, CONFIG.startPosition, CONFIG.playerSize);
        this.ref.id = "player"
        
        this.spritesheetImgRef = document.createElement('img');
        this.spritesheetImgRef.id = "spriteImg";
        this.spritesheetImgRef.alt = "Daegal";
        this.ref.appendChild(this.spritesheetImgRef);

        // Set starting position
        this.ref.style.right = `${CONFIG.startPosition.x}px`;
        this.ref.style.top = `${CONFIG.startPosition.y}px`;

        setInterval(() => this.loop(), 1);
    }

    // Runs every millisecond;
    loop() {
        if (this.frame % CONFIG.animationSpeed === 0)this.animate(0);
        this.frame++;
    }

    /**
     * Animate the player based on his speed
     * @param {number} speed 
     */
    animate(speed) {
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