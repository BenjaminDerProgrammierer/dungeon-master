import KeyboardListener from "./KeyboardListener.js";
import Player from "./Player.js";
import config from "../config.js";
import Item from "./Item.js";
import HeadUpDisplay from "./HeadUpDisplay.js";

export default class Game {
    // DOM Elements
    appElement;
    player;
    spriteImg;
    item;
    frame = 0;
    score = 0;
    nickname;
    keyboardListener;
    hud;
    loopInterval;
    backgroundMusic;

    constructor(appElement, nickname) {
        this.appElement = appElement;
        this.nickname = nickname;
    }

    run() {
        this.item = new Item(this.appElement)
        this.player = new Player(this.appElement);
        this.keyboardListener = new KeyboardListener();
        this.hud = new HeadUpDisplay(this.appElement);

        this.loopInterval = setInterval(() => this.loop(), 10);
        this.timeStarted = Date.now();

        this.item.moveToRandom();

        this.backgroundMusic = new Audio("assets/background-music/Dead Planet.wav");
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 0.05;
        this.backgroundMusic.play();

        document.addEventListener('keydown', (e) => {
            if (e.key == 'k') {
                this.item.scale.x += 1;
                this.item.scale.y += 1;
                this.item.redraw();
            } else if (e.key == 'l') {
                this.item.scale.x -= 1;
                this.item.scale.y -= 1;
                this.item.redraw();
            } else if (e.key == 'Escape') {
                this.end();
            }
        })
    }

    // Runs every millisecond
    loop() {
        if (this.frame % config.animationSpeed === 0) this.player.animate(this.keyboardListener.getMoveDirection());
        if (this.frame % config.moveSpeed === 0) this.player.move(this.keyboardListener.getMoveDirection());

        if (this.player.isCollidingWith(this.item)) {
            this.score++;
            const audio = new Audio('./assets/400 Sounds Pack/Items/coin_collect.wav');
            audio.volume = 0.1;
            audio.play();
            this.item.moveToRandom();
        }

        const time = new Date(Date.now() - this.timeStarted);

        if (time > config.gameDuration) this.end();

        this.hud.showInfo(`${this.score} - ${time.getMinutes()}:${time.getSeconds().toString().padStart(2, '0')}`);
        this.frame++;
    }

    end() {
        clearInterval(this.loopInterval);
        this.backgroundMusic?.pause();
        dispatchEvent(new CustomEvent('gameOver', { detail: { nickname: this.nickname, score: this.score } }));
    }
}