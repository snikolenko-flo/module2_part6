import { GalleryService } from "./gallery.service.js";

export class RenderGalleryHTML {
    constructor() {
        this.galleryService = new GalleryService();
    }

    renderPagesList(totalNumberOfPages) {
        const pages = document.getElementById('pages');
        pages.innerHTML = this.galleryService.wrapNumbersInHtml(totalNumberOfPages);
    }

    renderImages(imagesUrls) {
        const images = document.getElementById('images');
        images.innerHTML = this.galleryService.wrapUrlsInHtml(imagesUrls);
    }
}