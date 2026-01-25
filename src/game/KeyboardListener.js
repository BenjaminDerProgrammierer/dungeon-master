/**
 * Keyboard listener that calculates a moving direction based on WASD / Arrow keys pressed
 */
export default class KeyboardListener {
    keysPressed = {
        left: false,
        right: false,
        up: false,
        down: false
    }

    constructor() {
        document.addEventListener('keydown', (e) => {
            if (e.key === "ArrowLeft" || e.key === "a") {
                this.keysPressed.left = true;
            }
            if (e.key === "ArrowUp" || e.key === "w") {
                this.keysPressed.up = true;
            }
            if (e.key === "ArrowRight" || e.key === "d") {
                this.keysPressed.right = true;
            }
            if (e.key === "ArrowDown" || e.key === "s") {
                this.keysPressed.down = true;
            }
        });

        document.addEventListener('keyup', (e) => {
            if (e.key === "ArrowLeft" || e.key === "a") {
                this.keysPressed.left = false;
            }
            if (e.key === "ArrowUp" || e.key === "w") {
                this.keysPressed.up = false;
            }
            if (e.key === "ArrowRight" || e.key === "d") {
                this.keysPressed.right = false;
            }
            if (e.key === "ArrowDown" || e.key === "s") {
                this.keysPressed.down = false;
            }
        });

        window.addEventListener('blur', () => {
            this.keysPressed.left = false;
            this.keysPressed.right = false;
            this.keysPressed.up = false;
            this.keysPressed.down = false;
        });
    }

    /**
     * Calculate the current move direction based on pressed keys.
     * @returns {{x: number, y: number}} The move direction
     */
    getMoveDirection() {
        let x = this.keysPressed.right - this.keysPressed.left;
        let y = this.keysPressed.down - this.keysPressed.up;

        // Prevent faster diagonal speeds
        if (Math.abs(x) + Math.abs(y) > 1) {
            x /= 2;
            y /= 2;
        }

        return {x: x, y: y};
    }
}
