import './style.css';
import {translate} from "../i18n/translate.ts";
import {BASE_URL} from "../utils/app.ts";

const REPO_URL = 'https://github.com/lluiscamino/browser-games';

const GAMES = [
    {
        name: translate('rulatrago'),
        link: resolveUrl('rulatrago'),
        icon: resolveUrl('homepage/rulatrago.png')
    },
    {
        name: translate('pyramid'),
        link: resolveUrl('piramide'),
        icon: resolveUrl('homepage/pyramid.png')
    }
];

document.body.innerHTML = `
<header>
    <div class="logo">
        <div class="logo-orb"></div>
        ${translate('browser_games')}
    </div>
</header>

<main>
    <div class="games-grid">
        ${GAMES.map(({name, link, icon}) => `
        <div class="game-card">
            <a href="${link}" class="launch-link" aria-label="${name}"></a>
            <div class="icon-container">
                <img src="${icon}" alt="${name}">
            </div>
            <div class="game-info">
                <h2>${name}</h2>
            </div>
        </div>`).join('')}

        <div class="game-card" style="opacity: 0.5;">
            <a href="${REPO_URL}" class="launch-link" aria-label="${translate('add_game')}"></a>
            <div class="icon-container">
                <div style="width:64px; height:64px; background: rgba(255,255,255,0.2); border-radius: 8px;"></div>
            </div>
            <div class="game-info">
                <h2>${translate('add_game')}</h2>
            </div>
        </div>
    </div>
</main>

<footer>
    <div class="taskbar-item">
        <div class="logo-orb" style="width: 24px; height: 24px;"></div>
    </div>
    <span style="margin-left: 15px;"><span class="footer-label">${translate('games_count', {num: GAMES.length})}</span> | <a href="${REPO_URL}" target="_blank" class="footer-label">${translate('see_source_code')}</a></span>
</footer>`;

export function resolveUrl(path: string) {
    return new URL(path, BASE_URL).href;
}