import { UrlManipulationService } from "../services/url-manipulation.service.js";
import { TokenService } from "./token.service.js";

export class TokenChecking {
    constructor() {
        this.urlService = new UrlManipulationService();
        this.tokenService = new TokenService();
    }

    checkExpireTime() {
        const timeLeft = this.tokenService.getTimeLeft();
        this.tokenService.setExpireTimer(timeLeft);
    }

    checkTokenExists() {
        if (!this.tokenService.tokenExists()) {
            this.#redirectToLogin();
        }
    }

    #redirectToLogin() {
        const pageNumber = this.urlService.getPageNumberFromUrl();
        window.location.href = `../login/login.html?page=${pageNumber}`;
    }
}