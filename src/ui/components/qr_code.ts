import QRCodeLib from 'qrcode'

export class QRCode {
    private readonly container: HTMLElement;

    constructor(canvas: HTMLCanvasElement) {
        this.container = canvas;
    }

    render(): HTMLElement {
        return this.container;
    }

    public static async create(doc: Document, data: string): Promise<QRCode> {
        const container = doc.createElement('canvas');
        container.className = 'qr-code';
        await QRCodeLib.toCanvas(container, data, {color: {dark: '#3e1e68'}});
        return new QRCode(container);
    }
}