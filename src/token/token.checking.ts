import { UrlManipulationService } from "../services/url-manipulation.service.js";
import { TokenService } from "./token.service.js";

export class TokenChecking {
    urlService: UrlManipulationService;
    tokenService: TokenService;

    constructor() {
        this.urlService = new UrlManipulationService();
        this.tokenService = new TokenService();
    }

    checkExpireTime() {
        const timeLeft: number = this.tokenService.getTimeLeft();
        this.tokenService.setExpireTimer(timeLeft);
    }

    checkTokenExists() {
        if (!this.tokenService.tokenExists()) {
            this.redirectToLogin();
        }
    }

    private redirectToLogin() {
        const pageNumber: number = this.urlService.getPageNumberFromUrl();
        window.location.href = `../login.html?${pageNumber}`;
    }
}