import type {GameController} from "../game/controller.ts";
import {PyramidHolder} from "./components/pyramid_holder.ts";
import {Footer} from "./components/footer.ts";
import type {Card} from "../../cards/card.ts";
import {Alert} from "../../ui/components/alert.ts";
import {translate} from "../../i18n/translate.ts";
import {Dialog} from "../../ui/components/dialog.ts";
import {CommonFooter} from "../../ui/components/common_footer.ts";

export class GameUI {
    private readonly gameController: GameController;
    private readonly doc: Document;
    private mainContainer!: HTMLElement;
    private pyramidHolder!: PyramidHolder;
    private footer!: Footer;
    private tokensAlert!: Alert;

    constructor(gameController: GameController, doc: Document) {
        this.gameController = gameController;
        this.doc = doc;
    }

    init(): void {
        this.pyramidHolder = new PyramidHolder(this.doc, this.gameController.getPyramidSize(), (card) => this.onPyramidCardClick(card));
        this.footer = new Footer(this.doc, this.gameController.getHand(), () => this.revealNextRow(), () => this.startNewPyramid());
        this.tokensAlert = Alert.hiddenInfoAlert(this.doc);
        this.mainContainer = this.doc.createElement('main');
        this.mainContainer.role = 'main';
        this.mainContainer.className = 'game';
        this.mainContainer.appendChild(this.pyramidHolder.render());
        this.mainContainer.appendChild(this.footer.render());
        this.doc.body.appendChild(this.mainContainer);
        this.doc.body.appendChild(new CommonFooter(this.doc).render());
    }

    private onPyramidCardClick(card: Card): void {
        const tokensWon = this.gameController.activateCard(card);
        if (tokensWon == null) {
            Dialog.showWarning(this.doc, translate('cannot_activate_card'));
            return;
        }
        this.updateFooter();
        if (this.tokensAlert) {
            this.tokensAlert.show(translate('hand_out_drinks', {tokensWon}));
        }
    }

    private revealNextRow(): void {
        this.pyramidHolder.revealNextRow(this.gameController.revealCardsRow().cards);
        this.tokensAlert?.hide();
    }

    private startNewPyramid(): void {
        this.gameController.startNewPyramid();
        this.tokensAlert?.hide();
        this.mainContainer.parentNode!.removeChild(this.mainContainer);
        this.init();
    }

    private updateFooter(): void {
        this.footer.updateHand(this.gameController.getHand());
    }
}