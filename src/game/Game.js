import KeyboardListener from "./KeyboardListener.js";
import { Player } from "./Player.js";
import { CONFIG } from "../config.js";
import { Item } from "./Item.js";
import { HeadUpDisplay } from "./HeadUpDisplay.js";

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
        this.hud = new HeadUpDisplay(this.appElement);
        setInterval(() => this.loop(), 10);

        document.addEventListener('keydown', (e) => {
            if (e.key == 'k') {
                this.item.scale.x += 1;
                this.item.scale.y += 1;
                this.item.redraw();
            } else if (e.key == 'l')  {
                this.item.scale.x -= 1;
                this.item.scale.y -= 1;
                this.item.redraw();               
            }
        })
    }

    // Runs every millisecond
    loop() {
        if (this.frame % CONFIG.animationSpeed === 0) this.player.animate(this.keyboardListener.getMoveDirection());
        if (this.frame % CONFIG.moveSpeed === 0) this.player.move(this.keyboardListener.getMoveDirection());
        
        if (this.player.isCollidingWith(this.item)) {
            this.score++;
            this.item.moveToRandom();
        }
        
        this.hud.showInfo(this.score);
        this.frame++;
    }
}