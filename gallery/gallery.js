import { loadGallery, fetchGallery } from "/gallery/handler.js";
import { checkToken } from "../token/handler.js";

checkToken();
await loadGallery();

const pages = document.getElementById('pages');
pages.onclick = fetchGallery;
