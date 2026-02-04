# Dungeon Master

![Time Tracked Badge](https://hackatime-badge.hackclub.com/U07J7SUMSKA/spritegame)

A collecting game about a Wraith collecting gems in an old castle.

![Screenshot](./src/assets/shot-001.png)

Sammelspiel: Sounddesign:

* Erweitere dein Game mit passenden aufeinander abgestimmten Audio-Elementen Überlege dir dazu jeweils, welche Trigger für den Aufruf/Start des jeweiligen Audios sinnvoll wären.
* Beim Tastendruck (Schrittgeräusche, …)
* Beim Einsammeln („Sammel“-Geräusch)
* Beim Crashen (gegen die Wand laufen, beim Spielrand, …)
* Beim Spielstart
* Beim Spielende bzw. Game Over

Suche nach Sounds, die wirklich gut zu deinem Theme passen.
Auf folgenden Seiten finden sich viele Audio-Templates:

* https://mixkit.co/free-sound-effects/game/
* https://www.zapsplat.com/
* https://opengameart.org/art-search?keys=sounds
* https://pixabay.com/de/sound-effects/search/game/
* https://www.voicy.network/official-soundboards/games (Registrierung notwendig)

## Sammelspiel: Leaderboard

Erweitere dein Game mit einer Highscore-Tabelle auf Basis von Web Storage.

### Userinput

* Integriere einen Input für den Spielernamen (Nickname)
* Der Nickname wird während der aktiven Session gespeichert (normale globale JS Variable)

### Spielende

* Das Spiel soll in irgendeiner Art und Weise beendet werden – kein Endlosgame
(z.B. max. Punkte erreicht, Zeit abgelaufen, Charakter gestorben, …)
* Nach Spielende erscheint ein informativer Screen
("Gewonnen", "Game Over", ...).
* Der erreichte Score wird zusammen mit dem Nickname permanent gespeichert.
Lege dir dazu ein JSON/Array mit den entsprechenden Werten an und lege es im Local Storage ab.

### Leaderboard

* Implementiere einen Übersichtsscreen (Overlay) mit allen Highscores.
* Lese alle Scores aus deinem Local Storage aus und zeige sie übersichtlich in einer Tabelle/Grid an
* Challenge: hebe deinen eigenen gerade erspielten Score besonders hervor
(Tipp: Vergleiche in der Schleife mit dem aktuellen Nickname)
