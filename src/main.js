import Game from './game/Game.js';
import LeaderBoard from './game/LeaderBoard.js';

const nicknameElement = document.getElementById('nickname');
nicknameElement.value = localStorage.getItem('nickname') || '';

let game;
let mainMenuMusic;

document.addEventListener("click", () => {
    if (!mainMenuMusic) {
        mainMenuMusic = new Audio('assets/background-music/Magical Forest.wav');
        mainMenuMusic.volume = 0.1;
        mainMenuMusic.loop = true;
        mainMenuMusic.play();
    }
});

document.getElementById('startForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent reload

    mainMenuMusic?.pause();
    playButtonSound()

    const nickname = nicknameElement.value.trim()
    if (nickname === '') {
        return;
    }
    localStorage.setItem('nickname', nickname);

    document.getElementById("titleScreen").style.display = 'none';
    document.getElementById("gameScreen").style.display = 'block';
    game = new Game(document.getElementById('app'), nickname).run();
})

document.getElementById("restartButton").addEventListener("click", () => {
    playButtonSound();
    setTimeout(() => location.reload(), 500);
});

globalThis.addEventListener('gameOver', (event) => {
    game = null;

    const audio = new Audio('./assets/400 Sounds Pack/Musical Effects/steel_drums_chime_positive.wav');
    audio.volume = 0.5;
    audio.play();

    const { nickname, score } = event.detail;
    let scoreboard = JSON.parse(localStorage.getItem('scoreboard') || '[]');

    for (const score of scoreboard) {
        score.last = false
    }
    scoreboard = scoreboard.filter(score => score.nickname != nickname)
    scoreboard.push({ nickname, score, last: true });

    localStorage.setItem('scoreboard', JSON.stringify(scoreboard));

    document.getElementById("gameScreen").style.display = 'none';
    document.getElementById("gameOverScreen").style.display = 'flex';

    document.querySelectorAll('.score').forEach(element => {
        element.textContent = score;
    });
});

document.getElementById('leaderBoardButton').addEventListener('click', () => {
    playButtonSound();
    new LeaderBoard().show(document.getElementById('titleScreen'));
});

function playButtonSound() {
    const audio = new Audio('./assets/400 Sounds Pack/Materials/concrete_scrape.wav');
    audio.volume = 0.5;
    audio.play();
}