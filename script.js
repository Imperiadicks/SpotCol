// ThemeTitleText
/*--------------------------------------------*/
const newElement = document.createElement('div');
newElement.className = 'SpotCol';
document.body.appendChild(newElement);
/*--------------------------------------------*/

setInterval(() => {
    updateBackgroundImage();
    setupAvatarZoomEffect();

    const section = document.querySelector('[class*="PlayerBarDesktop_root"]');
    if (!section) return;

    const style = getComputedStyle(section);
    const baseHSLString = style.getPropertyValue('--player-average-color-background');

    if (!baseHSLString) return;

    const parseHSL = (hslString) => {
        const hslRegex = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/;
        const match = hslString.match(hslRegex);

        if (match) {
            return {
                h: parseInt(match[1], 10),
                s: parseFloat(match[2]),
                l: parseFloat(match[3])
            };
        }
        return null;
    };

    const baseHSL = parseHSL(baseHSLString);
    if (!baseHSL) return;

    const variations = 10;

    const hslToString = ({ h, s, l }) => `hsl(${h}, ${s}%, ${l}%)`;
    const hslaToString = ({ h, s, l }, a) => `hsla(${h}, ${s}%, ${l}%, ${a})`;

    const createCSSVariables = (baseHSL, variations) => {
        let styleString = '';

        for (let i = 1; i <= variations; i++) {
            let lightness = baseHSL.l + i * (80 - baseHSL.l) / variations;
            styleString += `--color-light-${i}: ${hslToString({ ...baseHSL, l: lightness })};\n`;
            for (let j = 1; j <= 10; j++) {
                styleString += `--color-light-${i}-${j}: ${hslaToString({ ...baseHSL, l: lightness }, j / 10)};\n`;
            }
        }

        for (let i = 1; i <= variations; i++) {
            let lightness = baseHSL.l - i * baseHSL.l / variations;
            styleString += `--color-dark-${i}: ${hslToString({ ...baseHSL, l: lightness })};\n`;
            for (let j = 1; j <= 10; j++) {
                styleString += `--color-dark-${i}-${j}: ${hslaToString({ ...baseHSL, l: lightness }, j / 10)};\n`;
            }
        }

        return styleString;
    };

    const cssVariables = createCSSVariables(baseHSL, variations);
    let styleElement = document.getElementById('dynamic-colors-style');
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = 'dynamic-colors-style';
        document.head.appendChild(styleElement);
    }
    styleElement.textContent = `:root {\n${cssVariables}\n}`;

    let useStyleElement = document.getElementById('dynamic-use-style');
    if (!useStyleElement) {
        useStyleElement = document.createElement('style');
        useStyleElement.id = 'dynamic-use-style';
        document.head.appendChild(useStyleElement);
    }
    useStyleElement.textContent = `
        :root {
            --ym-background-color-primary-enabled-basic: var(--color-dark-8) !important;
            --ym-surface-color-primary-enabled-list: var(--color-light-1-4) !important;
            --ym-background-color-primary-enabled-content: var(--color-dark-6) !important;
            --ym-controls-color-primary-text-enabled_variant: var(--color-light-10-10) !important;
            --ym-controls-color-primary-text-enabled: var(--color-light-10-5) !important;
            --ym-controls-color-primary-text-hovered: var(--color-light-7) !important;
            --ym-background-color-secondary-enabled-blur: var(--color-light-1) !important;
            --ym-controls-color-secondary-outline-enabled_stroke: var(--color-light-10-3) !important;
            --ym-controls-color-secondary-outline-hovered_stroke: var(--color-light-5) !important;
            --ym-controls-color-secondary-on_outline-enabled: var(--color-light-10-8) !important;
            --ym-logo-color-primary-variant: var(--color-light-10) !important;
            --ym-controls-color-secondary-outline-selected: var(--color-dark-3) !important;
            --ym-controls-color-secondary-card-enabled: var(--color-dark-5-7) !important;
            --ym-controls-color-secondary-card-hovered: var(--color-light-5-5) !important;
            --ym-controls-color-primary-default-disabled: var(--color-light-4) !important;
            --ym-controls-color-primary-default-enabled: var(--color-light-10) !important;
            --ym-controls-color-primary-default-hovered: var(--color-light-8) !important;
            --ym-controls-color-secondary-default-disabled: var(--color-dark-1) !important;
            --ym-controls-color-secondary-default-enabled: var(--color-dark-5) !important;
            --ym-controls-color-secondary-default-hovered: var(--color-dark-3) !important;
            --ym-background-color-primary-enabled-popover: var(--color-dark-7-9) !important;
            --ym-controls-color-secondary-outline-disabled_stroke: var(--color-light-5-5)!important;
            --ym-controls-color-secondary-on_outline-disabled: var(--color-light-5-5)!important;
            --sync-lyrics-card-inset-bottom-vh: -11.5% !important;
            --sync-lyrics-card-inset-bottom-dvh: -11.5% !important;
        }

        .ChangeVolume_root__HDxtA {
            max-width: 160px;
        }

        .DefaultLayout_content__md70Z .MainPage_root__STXqc::-webkit-scrollbar {
            width: 0;
        }

        .MainPage_landing___FGNm {
            padding-right: 24px;
        }

        .SyncLyrics_content__lbkWP:after, .SyncLyrics_content__lbkWP:before {
            display: none;
        }
        
        .FullscreenPlayerDesktopContent_syncLyrics__6dTfH {
            margin-block-end: 0;
            height: calc(100vh);
        }

        .NavbarDesktop_logoLink__KR0Dk {
            margin-top: 15px;
        }

        canvas {
            opacity: 0.2 !important;
            filter: blur(360px) !important;
        }

        .VibeBlock_vibeAnimation__XVEE6:after {
            background: transparent !important;
        }

        .CollectionPage_collectionColor__M5l1f,
        .ygfy3HHHNs5lMz5mm4ON,
        .yvGpKZBZLwidMfMcVMR3 {
            color: var(--ym-logo-color-primary-variant);
        }

        .kc5CjvU5hT9KEj0iTt3C {
            backdrop-filter: none;
        }

        .kc5CjvU5hT9KEj0iTt3C:hover, .kc5CjvU5hT9KEj0iTt3C:focus {
            backdrop-filter: saturate(180%) blur(15px);
        }

        ::placeholder{
            color: var(--color-dark-1-10) !important;
        }

        .mdbxU6IWInQTsVjwnapn {
            background: var(--color-light-5) !important;
        }

        .xZzTMqgg0qtV5vqUIrkK {
            background-color: var(--color-dark-3-6) !important;
        }

        .FullscreenPlayerDesktop_poster_withSyncLyricsAnimation__bPO0o.FullscreenPlayerDesktop_important__dGfiL,
        .SyncLyricsCard_root__92qn_ {
            inset-block-end: 35px !important;
        }
    `;
}, 1000);

function updateBackgroundImage() {
    const imgElements = document.querySelectorAll('[class*="PlayerBarDesktop_cover"]');
    let imgBackground = "";

    imgElements.forEach(img => {
        if (img.src && img.src.includes('/1000x1000')) {
            imgBackground = img.src;
            backgroundReplace(imgBackground);
        }
    });
}

function backgroundReplace(br) {
    if (br) {
        const targetElement = document.querySelector('[class*="MainPage_vibe"]');
        if (targetElement) {
            targetElement.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, var(--color-dark-6) 100%), url(${br}) center center / cover no-repeat`;
        }
    }
}

function setupAvatarZoomEffect() {
    const avatarElement = document.querySelector('[class*="PageHeaderCover_coverImage"]');

    if (!avatarElement) return;

    avatarElement.classList.add('avatar-zoom');

    avatarElement.addEventListener('mousemove', (event) => {
        const rect = avatarElement.getBoundingClientRect();
        
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 9;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 9;

        const translateX = Math.max(-45, Math.min(45, -x * 11));
        const translateY = Math.max(-45, Math.min(45, -y * 11));

        avatarElement.style.transform = `scale(1.8) translate(${translateX}px, ${translateY}px)`;
    });

    avatarElement.addEventListener('mouseleave', () => {
        avatarElement.style.transform = 'scale(1)';
    });
}
// Spotify Screen
/*--------------------------------------------*/
setInterval(() => {
    const playerCover = document.querySelector('.PlayerBarDesktop_cover__IYLwR');
    const trackNameElement = document.querySelector('body > div > div > div > section > div > div > div > div > div > div > div > a > span.Meta_text__Y5uYH');
    const fallbackTrackNameElement = document.querySelector('body > div > div > div > section > div > div > div > div > div > div > div > span');
    const artistElement = document.querySelector('body > div > div > div > section > div > div > div > div > div > div.SeparatedArtists_root_clamp__SyvjM');
    const firstArtist = document.querySelector('body > div > div > div > section > div > div > div > div > div > div > a:nth-child(1) > span');
    const fallbackArtist = document.querySelector('body > div > div > div > section > div > div > div > div > div > div > span');
    let spotifyScreen = document.querySelector('.Spotify_Screen');

    if (!spotifyScreen) {
        spotifyScreen = document.createElement('div');
        spotifyScreen.classList.add('Spotify_Screen');
        document.body.appendChild(spotifyScreen);

        const allInfoContainer = document.createElement('div');
        allInfoContainer.classList.add('All_Info_Container');
        spotifyScreen.append(allInfoContainer);

        const artisInfoContainer = document.createElement('div');
        artisInfoContainer.classList.add('Artist_Info_Container');
        allInfoContainer.appendChild(artisInfoContainer);

        const infoTitle = document.createElement('div');
        infoTitle.classList.add('Info_Title');
        infoTitle.textContent = 'Сведения об исполнителе';
        artisInfoContainer.appendChild(infoTitle);

        const searchInfo = document.createElement('div');
        searchInfo.classList.add('Search_Info');
        artisInfoContainer.appendChild(searchInfo);

        // Neuro
        const gptInfoContainer = document.createElement('div');
        gptInfoContainer.classList.add('GPT_Info_Container');
        allInfoContainer.appendChild(gptInfoContainer);

        const gptInfoTitle = document.createElement('div');
        gptInfoTitle.classList.add('GPT_Info_Title');
        gptInfoTitle.textContent = 'Сведения о треке';
        gptInfoContainer.appendChild(gptInfoTitle);

        const gptSearchInfo = document.createElement('div');
        gptSearchInfo.classList.add('GPT_Search_Info');
        gptInfoContainer.appendChild(gptSearchInfo);

        const achtungAlert = document.createElement('div');
        achtungAlert.classList.add('Achtung_Alert');
        achtungAlert.textContent = 'В сведениях иногда бывают неправильные результаты. Проверяйте информацию подробнее, если изначально вам не всё равно!';
        allInfoContainer.appendChild(achtungAlert);
    }

    spotifyScreen.style.display = playerCover ? 'block' : 'none';

    let smBackground = document.querySelector('.SM_Background');
    if (!smBackground) {
        smBackground = document.createElement('div');
        smBackground.classList.add('SM_Background');
        spotifyScreen.appendChild(smBackground);
    }

    let smTitleContainer = document.querySelector('.SM_Title_Container');
    if (!smTitleContainer) {
        smTitleContainer = document.createElement('div');
        smTitleContainer.classList.add('SM_Title_Container');
        spotifyScreen.appendChild(smTitleContainer);
    }

    let smDecorateButtons = document.querySelector('.SM_Decorate_Buttons');
    if (!smDecorateButtons) {
        smDecorateButtons = document.createElement('div');
        smDecorateButtons.classList.add('SM_Decorate_Buttons');
        smTitleContainer.appendChild(smDecorateButtons);
    }
    let smCover = document.querySelector('.SM_Cover');
    if (!smCover) {
        smCover = document.createElement('div');
        smCover.classList.add('SM_Cover');
        spotifyScreen.appendChild(smCover);
    }

    let smDecorateAddToPlaylistButton = document.querySelector('.SM_Decorate_AddToPlaylist_Button');
    if (!smDecorateAddToPlaylistButton) {
        smDecorateAddToPlaylistButton = document.createElement('div');
        smDecorateAddToPlaylistButton.classList.add('SM_Decorate_AddToPlaylist_Button');
        spotifyScreen.appendChild(smDecorateAddToPlaylistButton);
    }

    let smTrackName = document.querySelector('.SM_Track_Name');
    if (!smTrackName) {
        smTrackName = document.createElement('div');
        smTrackName.classList.add('SM_Track_Name');
        spotifyScreen.appendChild(smTrackName);
    }

    smTrackName.textContent = trackNameElement ? trackNameElement.textContent : (fallbackTrackNameElement ? fallbackTrackNameElement.textContent : '');

    let smArtist = document.querySelector('.SM_Artist');
    if (!smArtist) {
        smArtist = document.createElement('div');
        smArtist.classList.add('SM_Artist');
        spotifyScreen.appendChild(smArtist);
    }

    if (artistElement) {
        smArtist.textContent = artistElement.textContent;
    }

    if (window.innerWidth < 1080) {
        spotifyScreen.style.display = 'none';
    }
}, 1000);

setInterval(() => {
    const imgElements = document.querySelectorAll('[class*="PlayerBarDesktop_cover__IYLwR"]');
    let imgBackground = "http://127.0.0.1:2007/Assets/no-cover-image.png";

    imgElements.forEach(img => {
        if (img.src && img.src.includes('/100x100')) {
            imgBackground = img.src.replace('/100x100', '/1000x1000');
            console.log(imgBackground);
        }
    });

    const targetElementCover = document.querySelector('.SM_Cover');
    if (targetElementCover) {
        targetElementCover.style.background = `url(${imgBackground}) center center / cover no-repeat`;
        console.log(targetElementCover);
    }

    const targetElementBackground = document.querySelector('.SM_Background');
    if (targetElementBackground) {
        targetElementBackground.style.background = `url(${imgBackground}) center center / cover no-repeat`;
        console.log(targetElementBackground);
    }
}, 1000);
/*--------------------------------------------*/

// Вики
/*--------------------------------------------*/
const targetElementSelector = 'body > div > div > div > section > div > div > div > div > div > div > a:nth-child(1) > span';
const fallbackElementSelector = 'body > div > div > div > section > div > div > div > div > div > div.SeparatedArtists_root_variant_breakAll__34YbW.SeparatedArtists_root_clamp__SyvjM.Meta_text__Y5uYH.Meta_artists__VnR52 > span';
const trackNameSelector = '.SM_Track_Name';
const Search_InfoSelector = '.Search_Info';
const GPT_Search_InfoSelector = '.GPT_Search_Info';
const AchtungAlertSelector = '.Achtung_Alert';
const GPT_InfoContainerSelector = '.GPT_Info_Container';

let lastArtist = '';
let lastTrack = '';
let lastText = '';

const fetchDataAndUpdateWiki = async (searchText) => {
    const Search_InfoElement = document.querySelector(Search_InfoSelector);
    const AchtungAlertElement = document.querySelector(AchtungAlertSelector);

    try {
        const response = await fetch(`https://ru.wikipedia.org/w/api.php?action=query&format=json&origin=*&titles=${encodeURIComponent(searchText)}&prop=extracts&exintro&explaintext`);
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        const page = Object.values(data.query.pages)[0];

        if (page.extract) {
            Search_InfoElement.innerText = page.extract || 'Нет информации';
            AchtungAlertElement.style.display = 'block';
        } else {
            Search_InfoElement.innerText = 'Нет информации';
            AchtungAlertElement.style.display = 'none';
        }
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        if (Search_InfoElement) {
            Search_InfoElement.innerText = 'Ошибка при получении информации';
        }
        if (AchtungAlertElement) {
            AchtungAlertElement.style.display = 'none';
        }
    }
};

const fetchDataAndUpdateNeuro = async (artistName, trackName) => {
    const Search_InfoElement = document.querySelector(Search_InfoSelector);
    const GPT_Search_InfoElement = document.querySelector(GPT_Search_InfoSelector);
    const AchtungAlertElement = document.querySelector(AchtungAlertSelector);

    try {
        const prompt = `
            Расскажи про артиста "${artistName}".
            Затем расскажи про трек "${trackName}" этого артиста.
            Раздели ответ следующим образом:
            "=== Артист ===
            [Артист] - [Информация об артисте]
            === Трек ===
            [Название трека] - [Информация о треке]"
            Не добавляй приветствий и дополнительных слов, кроме указанного разделения.
        `;

        const response = await fetch('http://api.onlysq.ru/ai/v1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([
                {
                    role: 'user',
                    content: prompt.trim(),
                },
            ]),
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        const gptAnswer = data.answer || 'Нет информации';

        // Разделение ответа по ключевым разделителям
        const [artistInfo, trackInfo] = gptAnswer.split(/=== Трек ===/i);

        if (Search_InfoElement) {
            Search_InfoElement.innerText = artistInfo?.replace(/=== Артист ===/i, '').trim() || 'Нет информации об артисте';
        }
        if (GPT_Search_InfoElement) {
            GPT_Search_InfoElement.innerText = trackInfo?.trim() || 'Нет информации о треке';
        }

        AchtungAlertElement.style.display = 'block';
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        if (Search_InfoElement) {
            Search_InfoElement.innerText = 'Ошибка при получении информации об артисте';
        }
        if (GPT_Search_InfoElement) {
            GPT_Search_InfoElement.innerText = 'Ошибка при получении информации о треке';
        }
        if (AchtungAlertElement) {
            AchtungAlertElement.style.display = 'none';
        }
    }
};

const checkForChanges = () => {
    const artistElement = document.querySelector(targetElementSelector) || document.querySelector(fallbackElementSelector);
    const trackElement = document.querySelector(trackNameSelector);

    const currentArtist = artistElement ? artistElement.innerText.trim() : '';
    const currentTrack = trackElement ? trackElement.innerText.trim() : '';

    if (neuroSearch) {
        if (currentArtist !== lastArtist || currentTrack !== lastTrack) {
            lastArtist = currentArtist;
            lastTrack = currentTrack;

            if (currentArtist || currentTrack) {
                fetchDataAndUpdateNeuro(currentArtist || 'Неизвестный артист', currentTrack || 'Неизвестный трек');
            }
        }
    } else {
        if (currentArtist !== lastText) {
            lastText = currentArtist;

            if (currentArtist) {
                fetchDataAndUpdateWiki(currentArtist);
            }
        }
        // Скрыть элемент, если neuroSearch == false
        const GPT_InfoContainerElement = document.querySelector(GPT_InfoContainerSelector);
        if (GPT_InfoContainerElement) {
            GPT_InfoContainerElement.style.display = 'none';
        }
    }
};

// Показать элемент, если neuroSearch == true
const toggleGPTInfoContainer = () => {
    const GPT_InfoContainerElement = document.querySelector(GPT_InfoContainerSelector);
    if (GPT_InfoContainerElement) {
        GPT_InfoContainerElement.style.display = neuroSearch ? 'block' : 'none';
    }
};

setInterval(() => {
    checkForChanges();
    toggleGPTInfoContainer();
}, 1000);

/*--------------------------------------------*/

// Cкрытие Spotify Screen
/*--------------------------------------------*/
setInterval(() => {
    const spotifyScreen = document.querySelector('.Spotify_Screen');
    const contentMain = document.querySelector('.Content_main__8_wIa');

    if (spotifyScreen && contentMain) {
        if (spotifyScreen.style.display === 'block') {
            contentMain.style.marginRight = '283px';
        } else if (spotifyScreen.style.display === 'none') {
            contentMain.style.marginRight = '';
        }
    }
}, 1000);
/*--------------------------------------------*/
// Отключение тупого даблклика
/*--------------------------------------------*/
function disableDoubleClick() {
    const elements = document.querySelectorAll('.PlayerBar_root__cXUnU');

    elements.forEach(element => {
        element.addEventListener('dblclick', function(event) {
            event.preventDefault();
            event.stopPropagation();
        }, true);
    });
}

setInterval(disableDoubleClick, 1000);
/*--------------------------------------------*/

// Google Noto Sans Font
/*--------------------------------------------*/
const link1 = document.createElement('link');
link1.rel = 'preconnect';
link1.href = 'https://fonts.googleapis.com';
document.head.appendChild(link1);

const link2 = document.createElement('link');
link2.rel = 'preconnect';
link2.href = 'https://fonts.gstatic.com';
link2.crossOrigin = 'anonymous';
document.head.appendChild(link2);

const link3 = document.createElement('link');
link3.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap';
link3.rel = 'stylesheet';
document.head.appendChild(link3);
/*--------------------------------------------*/

// GPT Update Notification
/*--------------------------------------------*/
function createNotification() {
  if (localStorage.getItem('notificationShown') === 'true') {
    return;
  }

  const background = document.createElement('div');
  background.classList.add('notification_background');

  const notification = document.createElement('div');
  notification.classList.add('notification');
  background.appendChild(notification);

  const title = document.createElement('div');
  title.classList.add('notification_title');
  title.textContent = 'Интеграция с ChatGPT!';
  notification.appendChild(title);

  const text = document.createElement('div');
  text.classList.add('notification_text');
  text.innerText = 'С версии Spotify Music! 2.1.0 вы можете использовать нейропоиск для получения информации об исполнителе и треке.\nЭту функцию можно активировать в файле "script.js" в разделе "Быстрые настройки" в самом верху скрипта, который находится в папке с темой.\n\nОтдельная благодарность chepuxcat за идею и API <3';
  notification.appendChild(text);

  const okButton = document.createElement('button');
  okButton.classList.add('notification_ok_button');
  okButton.textContent = 'OK';
  okButton.onclick = function() {
    background.remove();
    localStorage.setItem('notificationShown', 'true');
  };
  notification.appendChild(okButton);

  document.body.appendChild(background);
}

createNotification();
/*--------------------------------------------*/

/*Управление handleEvents.json*/
/*--------------------------------------------*/
let settings = {};

let neuroSearch, updateInterval;
let settingsDelay = 1000;

function log(text) {
    console.log('[Customizable LOG]: ', text)
}

async function getSettings() {
    try {
        const response = await fetch("http://127.0.0.1:2007/get_handle");
        if (!response.ok) throw new Error(`Ошибка сети: ${response.status}`);
        const data = await response.json();
        if (!data?.data?.sections) {
            console.warn("Структура данных не соответствует ожидаемой.");
            return {};
        }
        return Object.fromEntries(data.data.sections.map(({ title, items }) => [
            title,
            Object.fromEntries(items.map(item => [
                item.id,
                item.bool ?? item.input ?? Object.fromEntries(item.buttons?.map(b => [b.name, b.text]) || [])
            ]))
        ]));
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
        return {};
    }
}

async function setSettings(newSettings) {
    // Проверка и обновление значения neuroSearch
    if (Object.keys(settings).length === 0 || settings['Действия'].gptSearch !== newSettings['Действия'].gptSearch) {
        if (newSettings['Действия'].gptSearch) {
            neuroSearch = true;
        } else {
            neuroSearch = false;
        }
    }

    // Включение/отключение All_Info_Container
    const allInfoContainer = document.querySelector('.All_Info_Container');

    if (Object.keys(settings).length === 0 || settings['Действия'].allInfoContainerToggle !== newSettings['Действия'].allInfoContainerToggle) {
        if (newSettings['Действия'].allInfoContainerToggle) {
            allInfoContainer.style.display = 'block';
        } else {
            allInfoContainer.style.display = 'none';
        }
    }

    // Colorful II Downloader
    if (Object.keys(settings).length === 0 || settings['Colorful'].toggleColorfulII !== newSettings['Colorful'].toggleColorfulII) {
        const cssId = "custom-css"; 
        const existingLink = document.getElementById(cssId);
    
        if (newSettings['Colorful'].toggleColorfulII) {
            if (!existingLink) {
                fetch("https://raw.githubusercontent.com/Diramix/Colorful/Colorful-II/Colorful%20II/style.css")
                    .then(response => response.text())
                    .then(css => {
                        const style = document.createElement("style");
                        style.id = cssId;
                        style.textContent = css;
                        document.head.appendChild(style);
                    })
                    .catch(error => console.error("Ошибка загрузки CSS:", error));
            }
        } else {
            if (existingLink) {
                existingLink.remove();
            }
        }
    }

    // Open Blocker
    const modules = [
        "donations",
        "concerts",
        "trailers",
        "relevantnow"
    ];
    
    modules.forEach(module => {
        const settingKey = `OB${module.charAt(0) + module.slice(1)}`;
        const cssId = `openblocker-${module}`;
        const existingLink = document.getElementById(cssId);
        
        if (Object.keys(settings).length === 0 || settings['Open-Blocker'][settingKey] !== newSettings['Open-Blocker'][settingKey]) {
            if (newSettings['Open-Blocker'][settingKey]) {
                if (existingLink) {
                    existingLink.remove();
                }
            } else {
                if (!existingLink) {
                    fetch(`https://raw.githubusercontent.com/Open-Blocker-FYM/Open-Blocker/refs/heads/main/blocker-css/${module}.css`)
                        .then(response => response.text())
                        .then(css => {
                            const style = document.createElement("style");
                            style.id = cssId;
                            style.textContent = css;
                            document.head.appendChild(style);
                        })
                        .catch(error => console.error(`Ошибка загрузки CSS: ${module}`, error));
                }
            }
        }
    });

    // Auto Play
    if (newSettings['Developer'].devAutoPlayOnStart && !window.hasRun) {
        document.querySelector(`section.PlayerBar_root__cXUnU * [data-test-id="PLAY_BUTTON"]`)
        ?.click();
        window.hasRun = true;
    }
    
    // Update theme settings delay
    if (Object.keys(settings).length === 0 || settings['Особое'].setInterval.text !== newSettings['Особое'].setInterval.text) {
        const newDelay = parseInt(newSettings['Особое'].setInterval.text, 10) || 1000;
        if (settingsDelay !== newDelay) {
            settingsDelay = newDelay;

            // Обновление интервала
            clearInterval(updateInterval);
            updateInterval = setInterval(update, settingsDelay);
        }
    }
}

async function update() {
    const newSettings = await getSettings();
    await setSettings(newSettings);
    settings = newSettings;
}

function init() {
    update();
    updateInterval = setInterval(update, settingsDelay);
}

init();
/*--------------------------------------------*/