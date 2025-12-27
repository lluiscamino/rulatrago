import {QRCode} from "../../../ui/components/qr_code.ts";
import type {GameConfig} from "../../game/config.ts";
import {Button} from "../../../ui/components/button.ts";
import {translate} from "../../../i18n/translate.ts";

export class PlayersGameLinksSlider {
    private readonly container: HTMLElement;

    private constructor(doc: Document, gameLink: GameLink[]) {
        this.container = doc.createElement('div');
        const paragraph1 = doc.createElement('p');
        paragraph1.innerText = translate('share_game_links_description');
        const paragraph2 = doc.createElement('p');
        paragraph2.innerHTML = translate('share_game_links_warning');
        this.container.appendChild(paragraph1);
        const gameLinksContainer = doc.createElement('div');
        gameLinksContainer.className = 'player-game-links-slider';
        gameLink
            .map((config) => createPlayerGameLinkElement(doc, config))
            .forEach(element => gameLinksContainer.appendChild(element));
        this.container.appendChild(gameLinksContainer);
        this.container.appendChild(createShareAllLinksButton(doc, gameLink));
        this.container.appendChild(paragraph2);
    }

    render(): HTMLElement {
        return this.container;
    }

    public static async create(doc: Document, baseUrl: URL, playersGameConfigs: GameConfig[]): Promise<PlayersGameLinksSlider> {
        const gameLinkPromises = playersGameConfigs.map(async (gameConfig) => {
            const url = gameConfig.toUrl(baseUrl);
            const qrCode = await QRCode.create(doc, url.href);
            return {gameConfig, url: url, qrCode: qrCode};
        });
        const gameLinks = await Promise.all(gameLinkPromises);
        return new PlayersGameLinksSlider(doc, gameLinks);
    }
}

interface GameLink {
    gameConfig: GameConfig;
    url: URL;
    qrCode: QRCode;
}

function createPlayerGameLinkElement(doc: Document, {
    gameConfig,
    qrCode,
    url
}: GameLink): HTMLElement {
    const container = doc.createElement('div');
    const heading = doc.createElement('b');
    heading.innerText = gameConfig.playerName;
    const qrCodeContainer = doc.createElement('button');
    qrCodeContainer.onclick = async () => {
        await navigator.share({
            title: gameConfig.playerName,
            text: translate('join_pyramid_game'),
            url: url.href
        });
    };
    qrCodeContainer.appendChild(qrCode.render());
    container.appendChild(heading);
    container.appendChild(qrCodeContainer);
    return container;
}

function createShareAllLinksButton(doc: Document, gameLinks: GameLink[]): HTMLButtonElement {
    return Button.createSecondaryButton(doc, translate('share_all_links'), () => navigator.share({
        text: `${translate('join_pyramid_game')}\n${gameLinks.map(({
                                                                       gameConfig,
                                                                       url
                                                                   }) => `- ${gameConfig.playerName}: ${url.href}`).join('\n')}`
    })).render();
}