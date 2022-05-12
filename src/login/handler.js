import { LoginManager } from "./login.manager.js";

const manager = new LoginManager();

export const validateUserInput = (formElement) => {
    return () => {
        const emailError = document.getElementById('emailError');
        manager.checkEmail(formElement, emailError);

        const passwordError = document.getElementById('passwordError');
        manager.checkPassword(formElement, passwordError);
    }
}

export const submitUserData = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    if (manager.isUserDataValid(email, password)) {
        await manager.loginUser(email, password);
    }
}
