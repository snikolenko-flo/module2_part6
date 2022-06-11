import { BASE_URL } from '../data/constants.js';
import { UrlManipulationService } from '../services/url-manipulation.service.js';
import { GalleryService } from '../gallery/gallery.service.js';
import { ValidationResult } from '../interfaces/validate';
import { TokenResponse } from '../interfaces/token';

const urlService = new UrlManipulationService();
const galleryService = new GalleryService();

export class LoginService {
  redirectToGallery(): void {
    const pageNumber: number = urlService.getPageNumberFromUrl();
    galleryService.redirectToPage(pageNumber);
  }

  handleEmailValidation(validatedEmail: ValidationResult, emailError: HTMLFormElement): void {
    if (!validatedEmail.isValid) {
      emailError.innerHTML = 'Email is not valid!';
    } else {
      emailError.innerHTML = '';
    }
  }

  handlePasswordValidation(validatedPassword: ValidationResult, passwordErrorElement: HTMLFormElement): void {
    if (!validatedPassword.isValid) {
      passwordErrorElement.innerHTML = validatedPassword.error;
    } else {
      passwordErrorElement.innerHTML = '';
    }
  }

  validateUserData(email: string, password: string): boolean {
    const validatedEmail: ValidationResult = this.validateEmail(email);
    const validatedPassword: ValidationResult = this.validatePassword(password);

    return validatedEmail.isValid && validatedPassword.isValid;
  }

  async fetchToken(email: string, password: string): Promise<TokenResponse> {
    const user = {
      email: email,
      password: password,
    };

    const url = `${BASE_URL}/login`;

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(user),
    });
    console.log(response);
    console.log('everything is ok');
    const result: TokenResponse = await response.json();
    console.log('not ok');
    if (response.ok) {
      console.log(result);
      return result;
    } else {
      throw Error(result.errorMessage);
    }
  }

  validateEmail(email: string): ValidationResult {
    const userEmail = {
      isValid: false,
    };

    const regexp = /\S+@\S+\.\S+/;
    const isValid: boolean = regexp.test(email);

    if (isValid) {
      userEmail.isValid = true;
    }

    return userEmail;
  }

  validatePassword(p: string): ValidationResult {
    const result = {
      isValid: false,
      error: '',
    };

    result.error = this.checkErrors(p);

    if (!result.error) {
      result.isValid = true;
    }

    return result;
  }

  private checkErrors(password: string): string {
    if (password.length < 8) return 'Your password must be at least 8 characters.';
    if (password.search(/[a-z]/) < 0) return 'Your password must contain at least one lowercase letter.';
    if (password.search(/[A-Z]/) < 0) return 'Your password must contain at least one uppercase letter.';
    if (password.search(/[0-9]/) < 0) return 'Your password must contain at least one digit.';
  }
}
