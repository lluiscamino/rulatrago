/**
 * Returns a shuffled array using the cryptographically secure Fisher-Yates algorithm.
 * @param array The array to shuffle (will not be updated)
 * @return a shuffled copy of `array`.
 */
export function secureShuffle<T>(array: T[]): T[] {
    const shuffledArray = [...array];
    const randomBuffer = new Uint32Array(shuffledArray.length);
    crypto.getRandomValues(randomBuffer);
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = randomBuffer[i] % (i + 1);
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

/**
 * Returns a shuffled array using the Fisher-Yates algorithm and a specific seed.
 * @param array The array to shuffle (will not be updated)
 * @param seed The numeric seed for determinism.
 * @return a shuffled copy of `array`.
 */
export function deterministicShuffle<T>(array: T[], seed: number): T[] {
    const shuffledArray = [...array];
    const rng = mulberry32(seed);
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

/**
 * Returns a random 32-bit unsigned integer.
 */
export function secureUint32(): number {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0];
}

/**
 * A simple seeded Pseudo-Random Number Generator (Mulberry32).
 * Returns a number between 0 and 1.
 */
function mulberry32(seed: number): () => number {
    return function () {
        let t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}