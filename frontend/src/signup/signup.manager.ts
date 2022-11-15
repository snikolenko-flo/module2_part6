import { SignupService } from './signup.service.js';
import { TokenService } from '../services/token.service.js';
import { ValidationResult } from '../interfaces/validate';
import { TokenResponse } from '../interfaces/token';

const tokenService = new TokenService();

export class SignupManager {
  signUpService: SignupService;

  constructor() {
    this.signUpService = new SignupService();
  }

  checkEmail(email: string, emailErrorElement: HTMLFormElement): void {
    const validatedEmail: ValidationResult = this.signUpService.validateEmail(email);
    this.signUpService.handleEmailValidation(validatedEmail, emailErrorElement);
  }

  checkPassword(password: string, passwordErrorElement: HTMLFormElement): void {
    const validatedPassword: ValidationResult = this.signUpService.validatePassword(password);
    this.signUpService.handlePasswordValidation(validatedPassword, passwordErrorElement);
  }

  isUserDataValid(email: string, password: string): boolean {
    return this.signUpService.validateUserData(email, password);
  }

  async signUpUser(email: string, password: string): Promise<void> {
    try {
      const result: TokenResponse = await this.signUpService.fetchToken(email, password);
      tokenService.setToken(result.token);
      await this.signUpService.redirectToGallery();
    } catch (e) {
      alert(e);
    }
  }
}
