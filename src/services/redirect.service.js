import { UrlManipulationService } from "./url-manipulation.service.js";
export class RedirectService {
    constructor() {
        this.urlService = new UrlManipulationService();
    }
    redirectToLogin() {
        const pageNumber = this.urlService.getPageNumberFromUrl();
        window.location.href = `../login.html?page=${pageNumber}`;
    }
}
