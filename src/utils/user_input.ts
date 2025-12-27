export function getUserInputAsNumber(params: URLSearchParams | FormData, key: string): number | null {
    const value = params.get(key) as string | null;
    if (value === null || value === '') {
        return null;
    }
    const num = Number(value);
    if (isNaN(num)) {
        return null;
    }
    return num;
}

export function getUserInputAsEnumValue<T extends Record<string, string | number>>(
    params: URLSearchParams | FormData,
    key: string,
    enumObject: T
): T[keyof T] | null {
    const value = params.get(key) as string | null;
    if (value === null || value === "") {
        return null;
    }
    const validValues = Object.values(enumObject);
    const numericValue = Number(value);
    if (!isNaN(numericValue) && validValues.includes(numericValue)) {
        return numericValue as T[keyof T];
    }
    if (validValues.includes(value)) {
        return value as unknown as T[keyof T];
    }
    return null;
}