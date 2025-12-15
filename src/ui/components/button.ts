import {assertNotEmpty} from "../../utils/assert.ts";

export class Button {
    private readonly element: HTMLButtonElement;

    private constructor(doc: Document, variant: ButtonVariant, label: string, onClick: () => void) {
        this.element = doc.createElement('button');
        this.element.className = `${variant}-btn`;
        this.element.innerText = assertNotEmpty(label, 'button label cannot be empty');
        this.element.onclick = onClick;
    }

    render() {
        return this.element;
    }

    public static createPrimaryButton(doc: Document, label: string, onClick: () => void): Button {
        return new Button(doc, ButtonVariant.PRIMARY, label, onClick);
    }

    public static createSecondaryButton(doc: Document, label: string, onClick: () => void): Button {
        return new Button(doc, ButtonVariant.SECONDARY, label, onClick);
    }
}

enum ButtonVariant {
    PRIMARY = 'primary',
    SECONDARY = 'secondary'
}