import {Label} from "./label.ts";

export class Input {
    private readonly container: HTMLElement;

    constructor(doc: Document, attributes: InputAttributes) {
        this.container = doc.createElement('div');
        this.container.id = `${attributes.id}-container`;
        this.container.className = `input-container ${attributes.type}-input-container`;
        this.container.appendChild(new Label(doc, attributes.id, attributes.label).render());
        this.container.appendChild(createInput(doc, attributes));
    }

    render(): HTMLElement {
        return this.container;
    }
}

export interface InputAttributes {
    type: InputType,
    label: string
    id: string,
    required?: boolean
    min?: number
    max?: number
}

export enum InputType {
    TEXT = 'text',
    NUMBER = 'number'
}

function createInput(doc: Document, {type, required, id, min, max}: InputAttributes): HTMLInputElement {
    const inputElement = doc.createElement('input');
    inputElement.type = type;
    inputElement.required = required ?? true;
    inputElement.id = id;
    inputElement.name = id;
    if (min != null) {
        inputElement.min = String(min);
    }
    if (min != null) {
        inputElement.max = String(max);
    }
    return inputElement;
}