import { loadGallery, fetchGallery } from "./handler.js";
import { checkToken } from "../token/handler.js";
checkToken();
(async () => {
    await loadGallery();
    const pages = document.getElementById("pages");
    pages.onclick = fetchGallery;
})();
