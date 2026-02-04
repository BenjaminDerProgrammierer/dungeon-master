import Dialog from "./Dialog.js";

export default class LeaderBoard extends Dialog {
    show(container) {
        const content = document.createElement('div');

        const leaderboardTable = document.createElement('table');
        leaderboardTable.classList.add('leaderboard-table');
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = "<th>Rank</th><th>Nickname</th><th>Score</th>";
        leaderboardTable.appendChild(headerRow);
        content.appendChild(leaderboardTable);


        const scoreboard = JSON.parse(localStorage.getItem("scoreboard") || "[]");
        scoreboard.sort((a, b) => b.score - a.score);
        for (let i = 0; i < scoreboard.length; i++) {
            const score = scoreboard[i];
            const row = document.createElement('tr');
            row.innerHTML = `<td>${i + 1}</td><td>${score.nickname}</td><td>${score.score}</td>`;
            leaderboardTable.appendChild(row);
        }

        super.show(container, content, "Leaderboard");
    }

    close() {
        this.ref.remove();
    }
}
