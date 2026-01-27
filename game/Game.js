import KeyboardListener from "./KeyboardListener";
import { Player } from "./Player";
import { CONFIG } from "../config";
import { Item } from "./Item";

export default class Game {
    // DOM Elements
    appElement;
    player;
    spriteImg;
    item;
    frame = 0;
    score = 0;

    constructor(appElement) {
        this.appElement = appElement;
    }

    run() {
        this.item = new Item(this.appElement)
        this.player = new Player(this.appElement);
        this.keyboardListener = new KeyboardListener();
        setInterval(() => this.loop(), 10);
    }

    // Runs every millisecond
    loop() {
        if (this.frame % CONFIG.animationSpeed === 0) this.player.animate(this.keyboardListener.getMoveDirection());
        if (this.frame % CONFIG.moveSpeed === 0) this.player.move(this.keyboardListener.getMoveDirection());
        
        if (this.player.isCollidingWith(this.item)) {
            this.score++;
            this.item.moveToRandom();
        } else {
            console.log("No collision");
        }
        this.frame++;
    }
}