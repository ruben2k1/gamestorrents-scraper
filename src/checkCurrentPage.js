async function checkCurrentPage(page) {
    const activeLink = await page.$('.pagination li.active a');

    if (!activeLink) {
        console.log('No existe la página actual');
        
        return false;
    }

    const linkText = await activeLink.textContent();
    const pageNumber = parseInt(linkText);

    if (pageNumber > 359) {
        console.log(`Ha llegado al límite. El número de página activa (${pageNumber}) es mayor que 359.`);
        
        return false;
    } else {
        console.log(`Continúe, página actual: ${pageNumber}`);
        
        return true;
    }
}

export default checkCurrentPage;