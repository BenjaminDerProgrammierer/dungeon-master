import { CONFIG } from "../config";
import KeyboardListener from "./KeyboardListener";

export default class Game {
    // DOM Elements
    appElement;
    player;
    spriteImg;
    item;

    constructor(appElement) {
        this.appElement = appElement;
    }

    run() {
        this.createElements();
        this.keyboardListener = new KeyboardListener();

        // Set starting position
        this.spriteImg.style.right = `${CONFIG.startPosition.x}px`;
        this.spriteImg.style.top = `${CONFIG.startPosition.y}px`;
    }

    /**
     * Creates the Player and an item
     */
    createElements() {
        this.player = document.createElement('div');
        this.player.id = "player";
        this.appElement.appendChild(this.player);

        this.spriteImg = document.createElement('img');
        this.spriteImg.id = "spriteImg";
        this.spriteImg.alt = "sprite";
        this.player.appendChild(this.spriteImg);


        this.item = document.createElement('div');
        this.item.id = "item";
        this.appElement.appendChild(this.item);
    }

}