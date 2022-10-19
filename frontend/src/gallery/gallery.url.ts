export class GalleryUrl {
  getClickedPageNumber(clickedPageNumber: number): number {
    if (clickedPageNumber) {
      return clickedPageNumber;
    }
  }

  addParametersToUrl(pageNumber: number, pageLimit: number): void {
    const urlInAddressBar = `./gallery.html?page=${pageNumber}&limit=${pageLimit}`;
    history.replaceState({}, '', urlInAddressBar);
  }
}
