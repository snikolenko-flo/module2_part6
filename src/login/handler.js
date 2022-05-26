import { LoginManager } from "./login.manager.js";
const manager = new LoginManager();
export const validateUserInput = (formElement) => {
    return () => {
        const email = formElement.email.value;
        const emailError = document.getElementById("emailError");
        manager.checkEmail(email, emailError);
        const passwordError = document.getElementById("passwordError");
        const password = formElement.password.value;
        manager.checkPassword(password, passwordError);
    };
};
export const submitUserData = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    if (manager.isUserDataValid(email, password)) {
        await manager.loginUser(email, password);
    }
};
