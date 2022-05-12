import { BASE_URL } from "../data/constants.js";
import { UrlManipulationService } from "../services/url-manipulation.service.js";
import { GalleryService } from "../gallery/gallery.service.js";

const urlService = new UrlManipulationService();
const galleryService = new GalleryService();

export class LoginService {
    redirectToGallery() {
        const pageNumber = urlService.getPageNumberFromUrl();
        galleryService.redirectToPage(pageNumber);
    }

    handleEmailValidation(validatedEmail, emailErrorElement) {
        if (!validatedEmail.isValid) {
            emailErrorElement.innerHTML = 'Email is not valid!'
        } else {
            emailErrorElement.innerHTML = '';
        }
    }

    handlePasswordValidation(validatedPassword, passwordErrorElement) {
        if (!validatedPassword.isValid) {
            passwordErrorElement.innerHTML = validatedPassword.error;
        } else {
            passwordErrorElement.innerHTML = '';
        }
    }

    validateUserData(email, password) {
        const validatedEmail = this.validateEmail(email);
        const validatedPassword = this.validatePassword(password);

        return validatedEmail.isValid && validatedPassword.isValid;
    }

    async fetchToken(email, password) {
        const user = {
            email: email,
            password: password
        };

        const url = `${BASE_URL}/login`;

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(user)
        });

        const result = await response.json();

        if (response.ok) {
            return result;
        } else {
            throw Error(result.errorMessage);
        }
    }

    validateEmail(email) {
        let userEmail = {
            isValid: false
        }

        let regexp = /\S+@\S+\.\S+/;
        const isValid = regexp.test(email);

        if (isValid) {
            userEmail.isValid = true;
        }

        return userEmail;
    }

    validatePassword(p) {
        const result = {
            isValid: false,
            error: ''
        }

        result.error = this.#checkErrors(p);

        if (!result.error) {
            result.isValid = true;
        }

        return result;
    }

    #checkErrors(password) {
        if (password.length < 8) return "Your password must be at least 8 characters.";
        if (password.search(/[a-z]/) < 0) return "Your password must contain at least one lowercase letter.";
        if (password.search(/[A-Z]/) < 0) return "Your password must contain at least one uppercase letter.";
        if (password.search(/[0-9]/) < 0) return "Your password must contain at least one digit.";
    }
}