import { CONFIG } from "../../config";
import { isColliding } from '../util/collisions'
import { CollidingEntity } from "./CollidingEntity";

export default class Player extends CollidingEntity {
    x = 0;
    y = 0;
    box = document.getElementById('player');
    spriteImg = document.getElementById('spriteImg');
    spriteImgNumber = 0;
    coinCount = 0;
    currentDirection = 1;

    constructor() {
        super();
        this.box.style.transform = `scale(${CONFIG.playerSize})`;
        this.box.style.left = CONFIG.initialPos.x + 'px';
        this.box.style.top = CONFIG.initialPos.y + 'px';
    }

    /**
     * @param {number} dx - player x move offset in pixel
     * @param {number} dy - player y move offset in pixel
     */
    move(dx, dy) {
        if (dx !== 0) {
            this.currentDirection = dx >= 0 ? 1 : -1;
        }

        this.x = this.x + dx * CONFIG.characterSpeed;
        this.y = this.y + dy * CONFIG.characterSpeed;

        if (this.x < 0) this.x = 0;
        if (this.y < 0) this.y = 0;
        if (this.x > CONFIG.surfaceSize.x) this.x = CONFIG.surfaceSize.x;
        if (this.y > CONFIG.surfaceSize.y) this.y = CONFIG.surfaceSize.y;

        this.box.style.left = (this.x + (this.currentDirection == -1 ? 100 : 0)) + 'px';
        this.box.style.top = this.y + 'px';

        this.box.style.transform = `scaleX(${this.currentDirection * CONFIG.playerSize}) scaleY(${CONFIG.playerSize})`;
    }

    collide(redBox) {
        const colliding = this.isCollidingWith(document.getElementById('redBox'));
        this.colliding = colliding
        // if (colliding) {
        //     this.coinCount++;
        //     redBox.style.left = Math.random() * CONFIG.surfaceSize.x + 'px';
        //     redBox.style.top = Math.random() * CONFIG.surfaceSize.y + 'px';
        // }
    }

    isCollidingWith(other) {
        return (
            this.position.x < other.position.x + other.width &&
            this.position.x + this.width > other.position.x &&
            this.position.y < other.position.y + other.height &&
            this.position.y + this.height > other.position.y
        );
    }

    /**
     * Play the walking or idle animation based on moving speed
     * @param {number} movingSpeed The current moving speed
     */
    animate(movingSpeed) {
        if (movingSpeed) {
            this.spriteImg.src = CONFIG.spritesheets.walking;
        } else {
            this.spriteImg.src = CONFIG.spritesheets.idle;
        }

        if (this.spriteImgNumber < CONFIG.frameCount) { // switch to next sprite position
            this.spriteImgNumber++;
            let x = Number.parseFloat(this.spriteImg.style.right);
            x += CONFIG.frameWidth;
            this.spriteImg.style.right = x + "px";
        } else { // animation loop finished: back to start animation
            this.spriteImg.style.right = "0px";
            this.spriteImgNumber = 0;
        }
    }
}
