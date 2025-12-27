import '../styles/luxury.css'
import './style.css';
import {GameUI} from "./ui/game_ui.ts";
import {GameController} from "./game/controller.ts";
import {GameConfig} from "./game/config.ts";
import {GameCreationUI} from "./ui/game_creation_ui.ts";

const url = new URL(window.location.href);
const gameConfig = GameConfig.createFromSearchParams(url.searchParams);
if (gameConfig) {
    startGame(gameConfig);
} else {
    new GameCreationUI(window, redirectToGame).init();
}


function startGame(gameConfig: GameConfig) {
    const gameController = GameController.create(gameConfig);
    new GameUI(gameController, window.document).init();
}

function redirectToGame(gameConfig: GameConfig) {
    window.location.href = gameConfig.toUrl(url).href;
}