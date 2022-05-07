export class GalleryURL {
    getClickedPageNumber(event) {
        const clickedPageNumber = Number(event.target.innerText);

        if (clickedPageNumber) {
            return clickedPageNumber;
        }
    }

    addPageToUrl(pageNumber) {
        const urlInAddressBar = `../gallery/gallery.html?page=${pageNumber}`;
        history.replaceState({}, '', urlInAddressBar);
    }
}