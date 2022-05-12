import { GalleryManager } from "./gallery.manager.js";
import { UrlManipulationService } from "../services/url-manipulation.service.js";

const urlService = new UrlManipulationService();

const manager = new GalleryManager();

export async function loadGallery() {
    try {
        const pageNumber = urlService.getPageNumberFromUrl();
        const images = await manager.api.fetchImages(pageNumber);

        manager.render.renderPagesList(images.total);
        manager.render.renderImages(images.objects);
        manager.url.addPageToUrl(pageNumber);
    } catch(e) {
        if ( !(e instanceof TypeError) ) alert(e);
    }
}

export async function fetchGallery(event) {
    event.preventDefault();

    const clickedPageNumber = manager.url.getClickedPageNumber(event);
    if (!clickedPageNumber) return;

    try {
        const images = await manager.api.fetchImages(clickedPageNumber);
        manager.render.renderImages(images.objects);
        manager.url.addPageToUrl(clickedPageNumber);
    } catch(e) {
        alert(e);
    }
}


