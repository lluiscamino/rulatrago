import {assertUnreachable} from "../../utils/assert.ts";

export class Alert {
    private readonly container: HTMLElement;

    private constructor(doc: Document, severity: AlertSeverity, label: string) {
        this.container = doc.createElement('div');
        this.container.role = severityToAriaRole(severity);
        this.container.className = `alert alert-${severity}`;
        this.container.innerText = label;
    }

    render() {
        return this.container;
    }

    show(label: string | undefined = undefined) {
        if (typeof label !== 'undefined') {
            this.container.innerText = label;
        }
        this.container.classList.remove('hidden');
    }

    hide() {
        this.container.classList.add('hidden');
    }

    public static hiddenInfoAlert(doc: Document): Alert {
        const alert = new Alert(doc, AlertSeverity.INFO, '');
        alert.hide();
        doc.body.appendChild(alert.render());
        return alert;
    }
}

export enum AlertSeverity {
    INFO = 'info',
}

function severityToAriaRole(severity: AlertSeverity): string {
    switch (severity) {
        case AlertSeverity.INFO:
            return 'status';
        default:
            assertUnreachable(severity);
    }
}