export class Label {
    private readonly element: HTMLLabelElement;

    constructor(doc: Document, htmlFor: string, text: string) {
        this.element = doc.createElement('label');
        this.element.htmlFor = htmlFor;
        this.element.innerText = text;
    }

    render(): HTMLElement {
        return this.element;
    }
}