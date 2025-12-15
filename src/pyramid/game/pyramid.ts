import type {Card} from "../../cards/card.ts";
import {type CardDeck, nextNCardsOrThrow} from "../../cards/deck.ts";
import {assert} from "../../utils/assert.ts";

export class Pyramid {
    private readonly rows: CardRow[];

    private constructor(rows: CardRow[]) {
        this.rows = rows;
    }

    public getRow(rowNumber: number): CardRow {
        assert(rowNumber >= 0 && rowNumber < this.rows.length, `rowNumber (${rowNumber}) must be in [0, ${this.rows.length - 1}]`);
        return this.rows[rowNumber];
    }

    public newRowsIterator(): PyramidRowsIterator {
        return new PyramidRowsIterator(this);
    }

    public static create(deck: CardDeck, baseRowSize: number): Pyramid {
        assert(baseRowSize > 0, 'baseRowSize must be > 0');
        const rows: CardRow[] = [];
        for (let i = 0; i < baseRowSize; i++) {
            rows.push(createRow(deck, baseRowSize - i));
        }
        return new Pyramid(rows);
    }
}

export class PyramidRowsIterator {
    private readonly pyramid: Pyramid;
    private currentRowNumber: number = -1;

    constructor(pyramid: Pyramid) {
        this.pyramid = pyramid;
    }

    public getCurrentRowNumber(): number {
        return this.currentRowNumber;
    }

    public getCurrentRow(): CardRow {
        return this.pyramid.getRow(this.currentRowNumber);
    }

    public nextRow(): CardRow {
        return this.pyramid.getRow(++this.currentRowNumber);
    }
}

export interface CardRow {
    cards: Card[]
}

function createRow(deck: CardDeck, size: number): CardRow {
    return {cards: nextNCardsOrThrow(deck, size)};
}