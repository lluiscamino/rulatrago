export const BASE_URL: URL = new URL(import.meta.env.BASE_URL, window.location.origin);

export const BUILD_DATE: Date = new Date(__BUILD_DATE__);