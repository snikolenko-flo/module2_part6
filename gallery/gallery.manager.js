import { RenderGalleryHTML } from "./gallery.render.js";
import { GalleryAPI } from "./gallery.api.js";
import { GalleryURL } from "./gallery.url.js";

export class GalleryManager {
    constructor() {
        this.render = new RenderGalleryHTML();
        this.api = new GalleryAPI();
        this.url = new GalleryURL();
    }
}