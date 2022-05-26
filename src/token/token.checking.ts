import { UrlManipulationService } from '../services/url-manipulation.service.js';
import { TokenService } from './token.service.js';
import { RedirectService } from '../services/redirect.service.js';

export class TokenChecking {
  urlService: UrlManipulationService;
  tokenService: TokenService;
  redirect: RedirectService;

  constructor() {
    this.urlService = new UrlManipulationService();
    this.tokenService = new TokenService();
    this.redirect = new RedirectService();
  }

  checkExpireTime(): void {
    const timeLeft: number = this.tokenService.getTimeLeft();
    this.tokenService.setExpireTimer(timeLeft);
  }

  checkTokenExists(): void {
    if (!this.tokenService.tokenExists()) {
      this.redirect.redirectToLogin();
    }
  }
}
