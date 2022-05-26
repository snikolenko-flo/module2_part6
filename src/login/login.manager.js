import { LoginService } from "./login.service.js";
import { setToken } from "../token/handler.js";
export class LoginManager {
    constructor() {
        this.loginService = new LoginService();
    }
    checkEmail(email, emailErrorElement) {
        const validatedEmail = this.loginService.validateEmail(email);
        this.loginService.handleEmailValidation(validatedEmail, emailErrorElement);
    }
    checkPassword(password, passwordErrorElement) {
        const validatedPassword = this.loginService.validatePassword(password);
        this.loginService.handlePasswordValidation(validatedPassword, passwordErrorElement);
    }
    isUserDataValid(email, password) {
        return this.loginService.validateUserData(email, password);
    }
    async loginUser(email, password) {
        try {
            const result = await this.loginService.fetchToken(email, password);
            setToken(result.token);
            this.loginService.redirectToGallery();
        }
        catch (e) {
            alert(e);
        }
    }
}
