import type {Card} from "./card.ts";
import {type CardDeck, nextNCardsOrThrow} from "./deck.ts";
import type {CardRank} from "./rank.ts";

export class CardHand {
    private readonly cards: Card[];

    private constructor(cards: Card[]) {
        this.cards = cards;
    }

    public getCards(): Card[] {
        return this.cards;
    }

    public withCardRankRemoved(cardRank: CardRank): CardHand {
        const newCards: Card[] = [];
        let removedCard = false;
        this.cards.forEach(c => {
            if (c.rank === cardRank && !removedCard) {
                removedCard = true;
            } else {
                newCards.push(c);
            }
        });
        return new CardHand(newCards);
    }

    public static create(deck: CardDeck, numCards: number): CardHand {
        return new CardHand(nextNCardsOrThrow(deck, numCards));
    }
}