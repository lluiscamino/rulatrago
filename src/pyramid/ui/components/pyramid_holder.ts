import {CardsHolder} from "../../../ui/components/cards_holder.ts";
import type {Card} from "../../../cards/card.ts";
import {assert} from "../../../utils/assert.ts";
import {translate} from "../../../i18n/translate.ts";

export class PyramidHolder {
    private readonly container: HTMLElement;
    private readonly cardsHolders: CardsHolder[];
    private readonly onCardClick: OnCardClick;
    private currentRow: number;

    constructor(doc: Document, pyramidSize: number, onCardClick: OnCardClick) {
        this.container = doc.createElement('div');
        this.cardsHolders = createCardsHolders(doc, pyramidSize);
        this.currentRow = pyramidSize - 1;
        this.onCardClick = onCardClick;
        this.container.className = 'pyramid';
        this.cardsHolders.forEach(cardsHolder => this.container.appendChild(cardsHolder.render()));
    }

    render(): HTMLElement {
        return this.container;
    }

    revealNextRow(cards: Card[]): void {
        assert(this.currentRow >= 0 && this.currentRow < this.cardsHolders.length, `currentRow (${this.currentRow}) must be in [0, ${this.cardsHolders.length - 1}]`);
        const prevCardsHolder = this.cardsHolders[this.currentRow + 1];
        const cardsHolder = this.cardsHolders[this.currentRow--];
        cardsHolder.reveal(cards);
        for (let i = 0; i < cards.length; i++) {
            const cardHolder = cardsHolder.getCardHolders()[i];
            cardHolder.setOnClickConfig({label: translate('activate_card'), onClick: () => this.onCardClick(cards[i])});
        }
        prevCardsHolder?.getCardHolders().forEach(cardHolder => cardHolder.clearOnClickConfig());
    }
}

function createCardsHolders(doc: Document, pyramidBaseSize: number): CardsHolder[] {
    const cardsHolders = [];
    for (let numCards = 1; numCards <= pyramidBaseSize; numCards++) {
        cardsHolders.push(CardsHolder.createHidden(doc, numCards));
    }
    return cardsHolders;
}

type OnCardClick = (card: Card) => void;