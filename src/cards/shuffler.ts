import {Card} from "./card.ts";
import {deterministicShuffle, secureShuffle} from "../utils/random.ts";

export interface Shuffler {
    shuffle(cards: Card[]): Card[]

    newShuffler(): Shuffler
}

export class RandomShuffler implements Shuffler {
    public shuffle(cards: Card[]): Card[] {
        return secureShuffle(cards);
    }

    public newShuffler(): Shuffler {
        return new RandomShuffler();
    }
}

export class DeterministicShuffler implements Shuffler {
    private readonly seed: number;

    constructor(seed: number) {
        this.seed = seed;
    }

    public shuffle(cards: Card[]): Card[] {
        return deterministicShuffle(cards, this.seed);
    }

    newShuffler(): Shuffler {
        return new DeterministicShuffler(this.seed * 1.7);
    }
}