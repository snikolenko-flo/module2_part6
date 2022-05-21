import { LoginManager } from "./login.manager.js";

const manager = new LoginManager();

export const validateUserInput = (formElement: HTMLFormElement) => {
    return () => {
        const emailError = document.getElementById('emailError') as HTMLFormElement;
        manager.checkEmail(formElement, emailError);

        const passwordError = document.getElementById('passwordError') as HTMLFormElement;
        manager.checkPassword(formElement, passwordError);
    }
}

export const submitUserData = async (event: Event) => {
    event.preventDefault();

    const email: string = (event.target as HTMLFormElement).email.value;
    const password: string = (event.target as HTMLFormElement).password.value;

    if (manager.isUserDataValid(email, password)) {
        await manager.loginUser(email, password);
    }
}
