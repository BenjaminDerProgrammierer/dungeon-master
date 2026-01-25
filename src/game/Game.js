import { CONFIG } from "../config";
import KeyboardListener from "./KeyboardListener";
import { Player } from "./Player";

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
        this.player = new Player(this.appElement);
        this.keyboardListener = new KeyboardListener();
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