import Player from "./Player";
import KeyboardListener from "../../game/KeyboardListener";
import GameBoard from "./GameBoard";
import { CONFIG } from "../../config";

export default class Game {
    keyboardListener = new KeyboardListener();
    board = new GameBoard();
    player = new Player();

    constructor() {
        this.keyboardListener.registerKeyEvents();
        this.board.rescaleSurface();

        document.getElementById("startButton").addEventListener("click", () => this.start());
        setInterval(() => this.loop(), 1000 / CONFIG.gameSpeed);
    }

    start() {
        this.started = true;
        this.player.box.style.opacity = '1';
        this.player.spriteImg.style.right = '0px';
        this.board.startButton.innerHTML = 'STARTED';
        this.board.startButton.removeEventListener("click", this.start);
    }

    loop() {
        if (!this.started) return;

        const moveDirection = this.keyboardListener.getMoveDirection();
        this.player.move(moveDirection.x, moveDirection.y);
        this.player.animate(Math.abs(moveDirection.x) + Math.abs(moveDirection.y));
        this.player.collide(this.board.redBox);

        this.showDebugMessage(`x: ${this.player.x} | y: ${this.player.y} | direction: ${moveDirection.x} | animation: ${this.player.spriteImgNumber} | count: ${this.player.coinCount} | colliding: ${this.player.colliding}`)
    }

    showDebugMessage(message) {
        this.board.debugOutput.innerHTML = message;
    }
}
