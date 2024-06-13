async function getGameData(page) {
    await page.waitForSelector('.game-page');

    const gameLocator = page.locator('.game-page');

    const gameData = await gameLocator.evaluateAll(() => {
        return [...document.querySelectorAll('.game-page')].map(gamePage => {
            const imgUrlElement = gamePage.querySelector('.post_imagem');
            const ext_img_url = imgUrlElement ? imgUrlElement.src.trim() : null;

            const firstDiv = gamePage.querySelector('.col-md-9 div:first-child');
            const gameTitleElement = firstDiv.querySelector('.listencio li:first-child strong');
            const title = gameTitleElement ? gameTitleElement.textContent.trim() : null;

            const platformElement = firstDiv.querySelector('.listencio li:nth-child(2) strong');
            const platform = platformElement ? platformElement.textContent.trim() : null;

            const fourthLi = firstDiv.querySelector('.listencio li:nth-child(4)');
            const genreAnchors = [...fourthLi.querySelectorAll('span a')];
            const genre = genreAnchors.map(anchor => anchor.textContent.toUpperCase().trim());

            const fifthLiStrong = firstDiv.querySelector('.listencio li:nth-child(5) strong');
            const format = fifthLiStrong ? fifthLiStrong.textContent.trim() : null;

            const thirdImages = [...firstDiv.querySelector('.listencio li:nth-child(3)').querySelectorAll('img')];
            const languagesUrl = thirdImages.map(img => img.src.trim());

            const secondDiv = gamePage.querySelector('.col-md-9 div:nth-child(2)');
            const ulElement = secondDiv.querySelector('.listencio');
            const size = ulElement.querySelector('li:first-child strong').textContent.trim();

            const dateString = ulElement.querySelector('li:nth-child(2) strong').textContent.trim();
            const [day, month, year] = dateString.split("-");
            const dateObject = new Date(`${year}-${month}-${day}`);
            const releasedAt = dateObject.toISOString().slice(0, 19).replace("T", " ");

            const releaseElement = ulElement.querySelector('li:nth-child(3) strong');
            const uploader = releaseElement ? releaseElement.textContent.trim() : null;

            const versionElement = ulElement.querySelector('li:nth-child(4) strong');
            const version = versionElement ? versionElement.textContent.trim() : null;

            const thirdDiv = gamePage.querySelector('.col-md-9 div:nth-child(3)');
            const descriptionParagraph = thirdDiv.querySelector('.mantekol');
            const description = descriptionParagraph.textContent.trim();
            
            const downloadUrlElement = gamePage.querySelector('#download_torrent');
            const ext_file_url = downloadUrlElement ? downloadUrlElement.href.trim() : null;        

            const iframeElement = gamePage.querySelector('.videoWrapperOuter .videoWrapperInner iframe');
            const trailerUrl = iframeElement ? iframeElement.src.trim() : null;        

            return { title, description, ext_img_url, platform, genre, format, size, releasedAt, uploader, version, ext_file_url, trailerUrl, languagesUrl};
        });
    });

    return gameData;
}

export default getGameData;