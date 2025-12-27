import {Label} from "./label.ts";

export class Select {
    private readonly container: HTMLElement;

    constructor(doc: Document, label: string, options: Options, id: string) {
        this.container = doc.createElement('div');
        this.container.id = `${id}-container`;
        this.container.className = 'select-container';
        this.container.appendChild(new Label(doc, id, label).render());
        this.container.appendChild(createSelect(doc, options, id));
    }

    render(): HTMLElement {
        return this.container;
    }
}

function createSelect(doc: Document, options: Options, id: string): HTMLSelectElement {
    const selectElement = doc.createElement('select');
    selectElement.id = id;
    selectElement.name = id;
    Object.entries(options)
        .map(([value, label]) => createOption(doc, value, label))
        .forEach(option => selectElement.appendChild(option));
    return selectElement;
}

function createOption(doc: Document, value: string, label: string): HTMLOptionElement {
    const optionElement = doc.createElement('option');
    optionElement.value = value;
    optionElement.innerText = label;
    return optionElement;
}

type Options = { [value: string]: string };