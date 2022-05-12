import { LoginService } from "./login.service.js";
import { setToken } from "../token/handler.js";

export class LoginManager {
    constructor() {
        this.loginService = new LoginService();
    }

    checkEmail(formElement, emailErrorElement) {
        const email = formElement.email.value;
        const validatedEmail = this.loginService.validateEmail(email);
        this.loginService.handleEmailValidation(validatedEmail, emailErrorElement);
    }

    checkPassword(formElement, passwordErrorElement) {
        const password = formElement.password.value;
        const validatedPassword = this.loginService.validatePassword(password);
        this.loginService.handlePasswordValidation(validatedPassword, passwordErrorElement);
    }

    isUserDataValid(email, password) {
        const isDataValid = this.loginService.validateUserData(email, password);
        return isDataValid;
    }

    async loginUser(email, password) {
        try {
            const result = await this.loginService.fetchToken(email, password);
            setToken(result.token);
            this.loginService.redirectToGallery();
        } catch(e) {
            alert(e);
        }
    }
}