import KeyboardListener from "./KeyboardListener";
import { Player } from "./Player";
import { CONFIG } from "../config";

export default class Game {
    // DOM Elements
    appElement;
    player;
    spriteImg;
    item;
    frame = 0;

    constructor(appElement) {
        this.appElement = appElement;
    }

    run() {
        this.createElements();
        this.player = new Player(this.appElement);
        this.keyboardListener = new KeyboardListener();
        setInterval(() => this.loop(), 10);
    }

    // Runs every millisecond
    loop() {
        if (this.frame % CONFIG.animationSpeed === 0) this.player.animate(this.keyboardListener.getMoveDirection());
        if (this.frame % CONFIG.moveSpeed === 0) this.player.move(this.keyboardListener.getMoveDirection());
        this.frame++;
    }

    /**
     * Creates the Player and an item
     */
    createElements() {
        this.item = document.createElement('div');
        this.item.id = "item";
        this.appElement.appendChild(this.item);
    }

}