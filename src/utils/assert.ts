export function assert(assertion: boolean, message: string): void {
    if (!assertion) {
        throw new Error(message);
    }
}

export function assertDefined<T>(value: T | undefined | null, message: string): T {
    assert(value !== null, message);
    return value!;
}

export function assertNotEmpty(value: string, message: string): string {
    assert(value.length > 0, message);
    return value;
}

export function assertUnreachable(_x: never): never {
    throw new Error('assertUnreachable was called!');
}