import Game from './game/Game.js';

document.getElementById('startButton').addEventListener('click', () => {
    document.getElementById("titleScreen").style.display = 'none';
    document.getElementById("gameScreen").style.display = 'block';
    new Game(document.getElementById('app')).run();
})
