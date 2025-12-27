import {WonTokensCalculationStrategy} from "./won_tokens_calculator.ts";
import {getUserInputAsEnumValue, getUserInputAsNumber} from "../../utils/user_input.ts";
import {translate} from "../../i18n/translate.ts";

const WON_TOKENS_CALCULATOR_STARTEGY_KEY = 'wtcs';
const RANDOM_SEED_KEY = 'rs';
const PLAYER_NUMBER_KEY = 'pn';
const NUM_PLAYERS_KEY = 'np';

export class GameConfig {
    public readonly wonTokensCalculatorStrategy: WonTokensCalculationStrategy;
    public readonly randomSeed: number;
    public readonly playerNumber: number;
    public readonly numPlayers: number;

    public constructor(
        wonTokensCalculatorStrategy: WonTokensCalculationStrategy,
        randomSeed: number,
        playerNumber: number,
        numPlayers: number
    ) {
        this.wonTokensCalculatorStrategy = wonTokensCalculatorStrategy;
        this.randomSeed = randomSeed;
        this.playerNumber = playerNumber;
        this.numPlayers = numPlayers;
    }

    public get playerName(): string {
        return translate('player_no', {playerNumber: this.playerNumber + 1});
    }

    public toUrl(baseUrl: URL): URL {
        const url = new URL(baseUrl.href);
        url.searchParams.set(WON_TOKENS_CALCULATOR_STARTEGY_KEY, String(this.wonTokensCalculatorStrategy));
        url.searchParams.set(RANDOM_SEED_KEY, String(this.randomSeed));
        url.searchParams.set(PLAYER_NUMBER_KEY, String(this.playerNumber));
        url.searchParams.set(NUM_PLAYERS_KEY, String(this.numPlayers));
        return url;
    }

    public otherPlayerConfigs(): GameConfig[] {
        const otherConfigs: GameConfig[] = [];
        for (let i = 0; i < this.numPlayers; i++) {
            if (i !== this.playerNumber) {
                otherConfigs.push(this.withPlayerNumber(i));
            }
        }
        return otherConfigs;
    }

    private withPlayerNumber(playerNumber: number): GameConfig {
        return new GameConfig(this.wonTokensCalculatorStrategy, this.randomSeed, playerNumber, this.numPlayers);
    }

    public static createFromSearchParams(params: URLSearchParams): GameConfig | null {
        const wonTokensCalculatorStrategy = getUserInputAsEnumValue(params, WON_TOKENS_CALCULATOR_STARTEGY_KEY, WonTokensCalculationStrategy);
        const randomSeed = getUserInputAsNumber(params, RANDOM_SEED_KEY);
        const playerNumber = getUserInputAsNumber(params, PLAYER_NUMBER_KEY);
        const numPlayers = getUserInputAsNumber(params, NUM_PLAYERS_KEY);
        if (wonTokensCalculatorStrategy == null || randomSeed == null || playerNumber == null || numPlayers == null) {
            return null;
        }
        return new GameConfig(wonTokensCalculatorStrategy, randomSeed, playerNumber, numPlayers);
    }
}