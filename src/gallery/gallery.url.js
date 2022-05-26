export class GalleryUrl {
    getClickedPageNumber(clickedPageNumber) {
        if (clickedPageNumber) {
            return clickedPageNumber;
        }
    }
    addPageToUrl(pageNumber) {
        const urlInAddressBar = `./gallery.html?page=${pageNumber}`;
        history.replaceState({}, "", urlInAddressBar);
    }
}
