import { CONFIG } from "../../config";

export default class GameBoard {
    surface = document.getElementById('surface');
    redBox = document.getElementById('redBox');
    startButton = document.getElementById('startButton');
    debugOutput = document.getElementById('debugOutput');

    rescaleSurface() {
        this.surface.style.transform = `scale(${CONFIG.surfaceScale * (window.innerWidth / this.surface.clientWidth)})`;
    }
}