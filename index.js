import { chromium } from '@playwright/test';
import getGameData from './src/getGameData.js';
import createGame from './src/createGame.js';
import createGenres from './src/createGenres.js';
import createFileRoutes from './src/createExtFileRoutes.js';
import createLanguages from './src/createLanguages.js';

const browser = await chromium.launch({ headless: true });

const page = await browser.newPage();

for (let i = 1; i <= 42; i++) {
    await page.goto(`https://www.gamestorrents.fm/juegos-pc/page/${i}`);

    await page.waitForSelector('#home .w3l-movie-gride-agile div a');

    const aLocator = page.locator('#home .w3l-movie-gride-agile div a');

    const aLinks = await aLocator.evaluateAll(aLinks => {
        return aLinks
            .map(a => a.href.trim())
            .filter(href => !href.includes('https://startgaming.net/tienda/suscripcion-premium/?offer_id=343442&gamesto=1'));
    });

    for (const link of aLinks) {
        await page.goto(link);

        const gameData = await getGameData(page);

        const title = gameData[0].title;
        const description = gameData[0].description;
        const type = 0;
        const format = gameData[0].format;
        const platform = gameData[0].platform;
        const size = gameData[0].size;
        const uploader = gameData[0].uploader;
        const releasedAt = gameData[0].releasedAt;
        const version = gameData[0].version;
        const ext_file_url = gameData[0].ext_file_url;
        const ext_img_url = gameData[0].ext_img_url;
        const trailerUrl = gameData[0].trailerUrl;
        const genre = gameData[0].genre;
        const languagesUrl = gameData[0].languagesUrl;

        const gameArray = [
            title,
            description,
            type,
            format,
            platform,
            size,
            version,
            uploader,
            ext_img_url,
            trailerUrl,
            releasedAt
        ]

        const currentFileId = await createGame(gameArray);

        for (let i = 0; i < genre.length; i++) {
            const gameGenreArray = [
                genre[i],
                currentFileId
            ]
    
            await createGenres(gameGenreArray);
        }

        const extFileUrlArray = [
            ext_file_url,
            currentFileId
        ]

        await createFileRoutes(extFileUrlArray);
        

        for (let i = 0; i < languagesUrl.length; i++) {
            const languagesArray = [
                languagesUrl[i],
                currentFileId
            ]

            await createLanguages(languagesArray);
        }

        await page.waitForLoadState('load');
    }

    console.log('Página: ' + i);
}

await browser.close();