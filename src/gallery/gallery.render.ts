import { GalleryService } from "./gallery.service.js";

export class RenderGalleryHtml {
    galleryService: GalleryService;

    constructor() {
        this.galleryService = new GalleryService();
    }

    renderPagesList(totalNumberOfPages: number) {
        const pages = document.getElementById('pages');
        pages.innerHTML = this.galleryService.wrapNumbersInHtml(totalNumberOfPages);
    }

    renderImages(imagesUrls: URL[]) {
        const images = document.getElementById('images');
        images.innerHTML = this.galleryService.wrapUrlsInHtml(imagesUrls);
    }
}