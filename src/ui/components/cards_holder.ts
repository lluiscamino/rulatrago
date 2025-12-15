import {CardHolder} from "./card_holder.ts";
import type {Card} from "../../cards/card.ts";
import {assert} from "../../utils/assert.ts";

export class CardsHolder {
    private readonly container: HTMLElement;
    private readonly cardHolders: CardHolder[];

    private constructor(doc: Document, numCards: number) {
        this.container = doc.createElement('section');
        this.container.className = 'cards-holder';
        const cardHolders = [];
        for (let i = 0; i < numCards; i++) {
            const cardHolder = new CardHolder(doc);
            cardHolders.push(cardHolder);
            this.container.appendChild(cardHolder.render());
        }
        this.cardHolders = cardHolders;
    }

    render(): HTMLElement {
        return this.container;
    }

    getCardHolders(): CardHolder[] {
        return this.cardHolders;
    }

    reveal(cards: Card[]): void {
        assert(cards.length === this.cardHolders.length, `different number of cards (${cards.length}) and card holders (${this.cardHolders.length})`);
        for (let i = 0; i < cards.length; i++) {
            this.cardHolders[i].displayCard(cards[i]);
        }
    }

    public static createHidden(doc: Document, numCards: number): CardsHolder {
        return new CardsHolder(doc, numCards);
    }

    public static createRevealed(doc: Document, cards: Card[]): CardsHolder {
        const cardsHolder = new CardsHolder(doc, cards.length);
        cardsHolder.reveal(cards);
        return cardsHolder;
    }
}