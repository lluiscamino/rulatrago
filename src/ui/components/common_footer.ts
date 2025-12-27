import {translate} from "../../i18n/translate.ts";
import {BASE_URL, BUILD_DATE} from "../../utils/app.ts";

export class CommonFooter {
    private readonly footer: HTMLElement;

    constructor(doc: Document) {
        this.footer = doc.createElement('footer');
        this.footer.className = 'common-footer';
        this.footer.appendChild(createMoreGamesAnchor(doc));
        this.footer.appendChild(createBuiltAtElement(doc));
    }

    render(): HTMLElement {
        return this.footer;
    }
}

function createMoreGamesAnchor(doc: Document): HTMLAnchorElement {
    const anchor = doc.createElement('a');
    anchor.textContent = translate('more_games');
    anchor.href = BASE_URL.href;
    return anchor;
}

function createBuiltAtElement(doc: Document): HTMLElement {
    const element = doc.createElement('span');
    element.innerText = translate('last_built_at');
    element.appendChild(createTimeElement(doc, BUILD_DATE));
    return element;
}

function createTimeElement(doc: Document, date: Date): HTMLTimeElement {
    const element = doc.createElement('time');
    element.dateTime = date.toISOString();
    element.innerText = date.toLocaleDateString();
    return element;
}