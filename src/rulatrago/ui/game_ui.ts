import {betButtonDataGroups} from "./ui_data.ts";
import type {GameController} from "../game/controller.ts";
import {Header} from "./components/header.ts";
import {Dialog} from "../../ui/components/dialog.ts";
import {translate} from "../../i18n/translate.ts";
import type {Bet} from "../game/bet_group.ts";
import {BetButtonsGroup} from "./components/bet_buttons_group.ts";
import {CommonFooter} from "../../ui/components/common_footer.ts";

export class GameUI {
    private readonly gameController: GameController;
    private readonly doc: Document;
    private readonly header: Header;

    constructor(gameController: GameController, doc: Document) {
        this.gameController = gameController;
        this.doc = doc;
        this.header = new Header(doc, gameController);
    }

    init() {
        this.doc.body.appendChild(this.header.render());
        const mainContainer = this.doc.createElement('main');
        mainContainer.role = 'main';
        for (const betButtonsGroup of betButtonDataGroups) {
            const group = new BetButtonsGroup(this.doc, betButtonsGroup, (bet) => this.onBetAdded(bet));
            mainContainer.appendChild(group.render());
        }
        this.doc.body.appendChild(mainContainer);
        this.doc.body.appendChild(new CommonFooter(this.doc).render());
    }

    private onBetAdded(bet: Bet): void {
        const betAllowed = this.gameController.addBet(bet);
        if (betAllowed) {
            this.header.updateBetsAmount();
        } else {
            Dialog.showWarning(this.doc, translate('too_many_bets'));
        }
    }
}