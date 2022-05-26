import { UrlManipulationService } from "../services/url-manipulation.service.js";
import { TokenService } from "./token.service.js";
import { RedirectService } from "../services/redirect.service.js";
export class TokenChecking {
    constructor() {
        this.urlService = new UrlManipulationService();
        this.tokenService = new TokenService();
        this.redirect = new RedirectService();
    }
    checkExpireTime() {
        const timeLeft = this.tokenService.getTimeLeft();
        this.tokenService.setExpireTimer(timeLeft);
    }
    checkTokenExists() {
        if (!this.tokenService.tokenExists()) {
            this.redirect.redirectToLogin();
        }
    }
}
