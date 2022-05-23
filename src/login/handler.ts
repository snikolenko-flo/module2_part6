import { LoginManager } from "./login.manager.js";

const manager = new LoginManager();

export const validateUserInput = (formElement: HTMLFormElement) => {
    return () => {
        const email: string = formElement.email.value;
        const emailError = document.getElementById('emailError') as HTMLFormElement;
        manager.checkEmail(email, emailError);

        const passwordError = document.getElementById('passwordError') as HTMLFormElement;
        const password: string = formElement.password.value;
        manager.checkPassword(password, passwordError);
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
