import { RenderGalleryHtml } from './gallery.render.js';
import { GalleryApi } from './gallery.api.js';
import { GalleryUrl } from './gallery.url.js';
export class GalleryManager {
    constructor() {
        this.render = new RenderGalleryHtml();
        this.api = new GalleryApi();
        this.url = new GalleryUrl();
    }
}
