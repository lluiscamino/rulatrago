import {PyramidRowsIterator} from "./pyramid.ts";
import type {CardRank} from "../../cards/rank.ts";
import {fibonacci} from "../../utils/fibonacci.ts";
import {assertUnreachable} from "../../utils/assert.ts";

export class WonTokensCalculator {
    private readonly strategy: WonTokensCalculationStrategy;
    private readonly pyramidRowsIterator: PyramidRowsIterator;

    constructor(strategy: WonTokensCalculationStrategy, pyramidRowsIterator: PyramidRowsIterator,) {
        this.strategy = strategy;
        this.pyramidRowsIterator = pyramidRowsIterator;
    }

    public calculateWonTokens(activeCardRanks: Map<CardRank, number>): number {
        const rowNumber = this.pyramidRowsIterator.getCurrentRowNumber();
        const numMatchingCards = this.numMatchingCardsInPyramidRow(activeCardRanks);
        switch (this.strategy) {
            case WonTokensCalculationStrategy.LINEAR:
                return numMatchingCards * (rowNumber + 1)
            case WonTokensCalculationStrategy.EXPONENTIAL:
                return numMatchingCards * Math.pow(2, rowNumber);
            case WonTokensCalculationStrategy.FIBONACCI:
                return numMatchingCards * fibonacci(rowNumber + 2)
            default:
                assertUnreachable(this.strategy)
        }
    }

    private numMatchingCardsInPyramidRow(activeCardRanks: Map<CardRank, number>): number {
        return this.pyramidRowsIterator.getCurrentRow().cards
            .map(({rank}) => activeCardRanks.get(rank) ?? 0)
            .reduce((sum, value) => sum + value, 0);
    }
}

export enum WonTokensCalculationStrategy {
    LINEAR = 'lin',
    EXPONENTIAL = 'exp',
    FIBONACCI = 'fib'
}