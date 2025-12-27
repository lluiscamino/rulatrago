import {GameConfig} from "../game/config.ts";
import {Input, InputType} from "../../ui/components/input.ts";
import {Button} from "../../ui/components/button.ts";
import {Select} from "../../ui/components/select.ts";
import {WonTokensCalculationStrategy} from "../game/won_tokens_calculator.ts";
import {translate} from "../../i18n/translate.ts";
import {getUserInputAsEnumValue, getUserInputAsNumber} from "../../utils/user_input.ts";
import {Dialog} from "../../ui/components/dialog.ts";
import {secureUint32} from "../../utils/random.ts";
import {PlayersGameLinksSlider} from "./components/players_game_links_slider.ts";
import {CommonFooter} from "../../ui/components/common_footer.ts";

const NUM_PLAYERS_ID = 'num-players';
const PYRAMID_TYPE_ID = 'pyramid-type';
const MIN_NUM_PLAYERS = 1;
const MAX_NUM_PLAYERS = 16;

export class GameCreationUI {
    private readonly baseUrl: URL;
    private readonly doc: Document;
    private readonly startGame: (gameConfig: GameConfig) => void;

    constructor(win: Window, startGame: (gameConfig: GameConfig) => void) {
        this.baseUrl = new URL(window.location.href);
        this.doc = win.document;
        this.startGame = startGame;
    }

    init() {
        const mainContainer = this.doc.createElement('main');
        const form = this.renderForm();
        mainContainer.role = 'main';
        mainContainer.appendChild(form);
        this.doc.body.appendChild(mainContainer);
        this.doc.body.appendChild(new CommonFooter(this.doc).render());
    }

    private renderForm(): HTMLFormElement {
        const form = this.doc.createElement('form');
        form.className = 'game-creation-form';
        form.onsubmit = (event) => {
            event.preventDefault();
            this.onFormSubmitted(new FormData(form));
        };
        form.appendChild(this.createNumberOfPlayersInput().render());
        form.appendChild(this.createPyramidTypeSelectInput().render());
        form.appendChild(this.createSubmitButton().render());
        return form;
    }

    private createNumberOfPlayersInput(): Input {
        return new Input(this.doc, {
            type: InputType.NUMBER,
            label: translate('num_players'),
            id: NUM_PLAYERS_ID,
            required: true,
            min: MIN_NUM_PLAYERS,
            max: MAX_NUM_PLAYERS
        });
    }

    private createPyramidTypeSelectInput(): Select {
        return new Select(this.doc, translate('pyramid_type'), {
            [WonTokensCalculationStrategy.LINEAR]: translate('linear'),
            [WonTokensCalculationStrategy.EXPONENTIAL]: translate('exponential'),
            [WonTokensCalculationStrategy.FIBONACCI]: translate('fibonacci')
        }, PYRAMID_TYPE_ID);
    }

    private createSubmitButton(): Button {
        return Button.createPrimaryButton(this.doc, translate('create_game'), () => null);
    }

    private onFormSubmitted(formData: FormData): void {
        const numPlayers = getUserInputAsNumber(formData, NUM_PLAYERS_ID);
        const pyramidType = getUserInputAsEnumValue(formData, PYRAMID_TYPE_ID, WonTokensCalculationStrategy);
        if (numPlayers == null || numPlayers < MIN_NUM_PLAYERS || numPlayers > MAX_NUM_PLAYERS) {
            Dialog.showWarning(this.doc, translate('input_valid_num_players', {
                min: MIN_NUM_PLAYERS,
                max: MAX_NUM_PLAYERS
            }));
            return;
        }
        if (pyramidType == null) {
            Dialog.showWarning(this.doc, translate('input_valid_pyramid_type'));
            return;
        }
        this.onValidFormSubmitted(numPlayers, pyramidType);
    }

    private onValidFormSubmitted(numPlayers: number, wonTokensCalculatorStrategy: WonTokensCalculationStrategy): void {
        const gameConfig = new GameConfig(wonTokensCalculatorStrategy, secureUint32(), /* playerNumber = */ 0, numPlayers);
        PlayersGameLinksSlider.create(this.doc, this.baseUrl, gameConfig.otherPlayerConfigs()).then(slider => {
            Dialog.show(this.doc, {
                title: translate('share_game_links'),
                content: slider.render(),
                primaryButtonText: translate('start_game'),
                onPrimaryButtonClick: () => this.startGame(gameConfig)
            });
        }).catch(error => {
            Dialog.showWarning(this.doc, translate('game_links_error'));
            console.log(error);
        });
    }
}