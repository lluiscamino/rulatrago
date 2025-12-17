import '../styles/luxury.css'
import './style.css';
import {GameUI} from "./ui/game_ui.ts";
import {WonTokensCalculationStrategy} from "./game/won_tokens_calculator.ts";
import {GameController} from "./game/controller.ts";

const gameController = GameController.create(WonTokensCalculationStrategy.EXPONENTIAL);
const ui = new GameUI(gameController, window.document);
ui.init();