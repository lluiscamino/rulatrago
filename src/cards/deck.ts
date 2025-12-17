import {Card} from "./card.ts";
import {assert} from "../utils/assert.ts";
import {RandomShuffler, type Shuffler} from "./shuffler.ts";

export interface CardDeck {
    hasNextCard(): boolean;

    nextCard(): Card;
}

class FiniteCardDeck implements CardDeck {
    private readonly cards: Card[];
    private cardPointer: number = 0;

    private constructor(cards: Card[]) {
        this.cards = cards;
    }

    hasNextCard(): boolean {
        return this.cardPointer < this.cards.length;
    }

    nextCard(): Card {
        assert(this.hasNextCard(), "No more cards left in deck");
        return this.cards[this.cardPointer++];
    }

    public static create(shuffler: Shuffler): FiniteCardDeck {
        return new FiniteCardDeck(shuffler.shuffle(Card.getAllCards()));
    }
}

class InfiniteCardDeck implements CardDeck {
    private shuffler: Shuffler;
    private deck: FiniteCardDeck;

    private constructor(shuffler: Shuffler, deck: FiniteCardDeck) {
        this.shuffler = shuffler;
        this.deck = deck;
    }

    hasNextCard(): boolean {
        return true;
    }

    nextCard(): Card {
        if (!this.deck.hasNextCard()) {
            this.shuffler = this.shuffler.newShuffler();
            this.deck = FiniteCardDeck.create(this.shuffler);
        }
        return this.deck.nextCard();
    }

    public static create(shuffler: Shuffler) {
        return new InfiniteCardDeck(shuffler, FiniteCardDeck.create(shuffler));
    }
}

export function createInfiniteDeck(shuffler: Shuffler = new RandomShuffler()): CardDeck {
    return InfiniteCardDeck.create(shuffler);
}

export function nextNCardsOrThrow(deck: CardDeck, numCards: number) {
    const cards: Card[] = [];
    for (let i = 0; i < numCards; i++) {
        cards.push(deck.nextCard());
    }
    return cards;
}