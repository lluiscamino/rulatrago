import {CardsHolder} from "../../../ui/components/cards_holder.ts";
import {Button} from "../../../ui/components/button.ts";
import type {CardHand} from "../../../cards/hand.ts";
import {translate} from "../../../i18n/translate.ts";

export class Footer {
    private readonly doc: Document;
    private readonly container: HTMLElement;
    private readonly handContainer: HTMLElement;

    constructor(doc: Document, cardHand: CardHand, revealNextRow: () => void, startNewPyramid: () => void) {
        this.doc = doc;
        this.container = doc.createElement('section');
        this.handContainer = doc.createElement('div');
        this.container.className = 'game-footer opaque-container';
        const revealRowButton = Button.createPrimaryButton(doc, translate('reveal_row'), () => revealNextRow());
        const newPyramidButton = Button.createSecondaryButton(doc, translate('new_pyramid'), () => startNewPyramid());
        this.updateHand(cardHand);
        this.container.appendChild(this.handContainer);
        this.container.appendChild(revealRowButton.render());
        this.container.appendChild(newPyramidButton.render());
    }

    render() {
        return this.container;
    }

    updateHand(cardHand: CardHand): void {
        this.handContainer.innerHTML = '';
        const cardsHolder = CardsHolder.createRevealed(this.doc, cardHand.getCards());
        this.handContainer.appendChild(cardsHolder.render());
    }
}