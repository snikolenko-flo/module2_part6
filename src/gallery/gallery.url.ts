export class GalleryURL {
    getClickedPageNumber(clickedPageNumber:number) {

        if (clickedPageNumber) {
            return clickedPageNumber;
        }
    }

    addPageToUrl(pageNumber:number) {
        const urlInAddressBar = `./gallery.html?page=${pageNumber}`;
        history.replaceState({}, '', urlInAddressBar);
    }
}