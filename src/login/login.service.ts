import { BASE_URL } from "../data/constants.js";
import { UrlManipulationService } from "../services/url-manipulation.service.js";
import { GalleryService } from "../gallery/gallery.service.js";
import { ValidationResult } from "../interfaces/validate";
import { TokenResponse } from "../interfaces/token";

const urlService = new UrlManipulationService();
const galleryService = new GalleryService();

export class LoginService {
    redirectToGallery() {
        const pageNumber: number = urlService.getPageNumberFromUrl();
        galleryService.redirectToPage(pageNumber);
    }

    handleEmailValidation(validatedEmail: ValidationResult, emailError: HTMLFormElement) {
        if (!validatedEmail.isValid) {
            emailError.innerHTML = 'Email is not valid!'
        } else {
            emailError.innerHTML = '';
        }
    }

    handlePasswordValidation(validatedPassword: ValidationResult, passwordErrorElement: HTMLFormElement) {
        if (!validatedPassword.isValid) {
            passwordErrorElement.innerHTML = validatedPassword.error;
        } else {
            passwordErrorElement.innerHTML = '';
        }
    }

    validateUserData(email: string, password: string) {
        const validatedEmail: ValidationResult = this.validateEmail(email);
        const validatedPassword: ValidationResult = this.validatePassword(password);

        return validatedEmail.isValid && validatedPassword.isValid;
    }

    async fetchToken(email: string, password: string) {
        const user = {
            email: email,
            password: password
        };

        const url: string = `${BASE_URL}/login`;

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(user)
        });

        const result: TokenResponse = await response.json();

        if (response.ok) {
            return result;
        } else {
            throw Error(result.errorMessage);
        }
    }

    validateEmail(email: string) {
        let userEmail = {
            isValid: false
        }

        let regexp: RegExp = /\S+@\S+\.\S+/;
        const isValid: boolean = regexp.test(email);

        if (isValid) {
            userEmail.isValid = true;
        }

        return userEmail;
    }

    validatePassword(p: string) {
        const result = {
            isValid: false,
            error: ''
        }

        result.error = this.checkErrors(p);

        if (!result.error) {
            result.isValid = true;
        }

        return result;
    }

    private checkErrors(password: string) {
        if (password.length < 8) return "Your password must be at least 8 characters.";
        if (password.search(/[a-z]/) < 0) return "Your password must contain at least one lowercase letter.";
        if (password.search(/[A-Z]/) < 0) return "Your password must contain at least one uppercase letter.";
        if (password.search(/[0-9]/) < 0) return "Your password must contain at least one digit.";
    }
}