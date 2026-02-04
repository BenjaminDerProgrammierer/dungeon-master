import Game from './game/Game.js';
import LeaderBoard from './game/LeaderBoard.js';

const nicknameElement = document.getElementById('nickname');
nicknameElement.value = localStorage.getItem('nickname') || '';

let game;

document.getElementById('startForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent reload

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
    location.reload();
});

globalThis.addEventListener('gameOver', (event) => {
    console.log("Game Over")
    game = null;
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
    new LeaderBoard().show(document.getElementById('titleScreen'));
});