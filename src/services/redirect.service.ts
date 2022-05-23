import { UrlManipulationService } from "./url-manipulation.service.js";

export class RedirectService {
    urlService: UrlManipulationService;

    constructor() {
        this.urlService = new UrlManipulationService();
    }

    redirectToLogin() {
        const pageNumber: number = this.urlService.getPageNumberFromUrl();
        window.location.href = `../login.html?page=${pageNumber}`;
    }
}