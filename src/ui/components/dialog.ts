import {translate} from "../../i18n/translate.ts";
import {Button} from "./button.ts";

export class Dialog {
    private readonly dialog: HTMLDialogElement;

    private constructor(doc: Document, {title, content, primaryButtonText, onPrimaryButtonClick}: DialogAttributes) {
        this.dialog = doc.createElement('dialog');
        this.dialog.className = 'game-dialog';
        const dialogTitle = doc.createElement('h2');
        content.classList.add('dialog-content');
        dialogTitle.className = 'dialog-title';
        dialogTitle.innerText = title;
        const button = Button.createPrimaryButton(doc, primaryButtonText, () => onPrimaryButtonClick(this));
        this.dialog.appendChild(dialogTitle);
        this.dialog.appendChild(content);
        this.dialog.appendChild(button.render());
    }

    public render(): HTMLElement {
        return this.dialog;
    }

    public show(): void {
        this.dialog.showModal();
    }

    public close(): void {
        this.dialog.close();
    }

    public static showWarning(doc: Document, text: string): void {
        const content = doc.createElement('p');
        content.innerText = text;
        const dialog = new Dialog(doc, {
            title: translate('hey'),
            content,
            primaryButtonText: translate('ok'),
            onPrimaryButtonClick: (dialog) => dialog.close()
        });
        doc.body.appendChild(dialog.render());
        dialog.show();
    }

    public static show(doc: Document, attributes: DialogAttributes): void {
        const dialog = new Dialog(doc, attributes);
        doc.body.appendChild(dialog.render());
        dialog.show();
    }
}

export interface DialogAttributes {
    title: string;
    content: HTMLElement;
    primaryButtonText: string;
    onPrimaryButtonClick: (dialog: Dialog) => void;
}