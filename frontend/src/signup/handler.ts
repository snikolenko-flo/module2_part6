import { SignupManager } from './signup.manager.js';

const manager = new SignupManager();

export const validateUserInput = (formElement: HTMLFormElement): (() => void) => {
  return () => {
    const email: string = formElement.email.value;
    const emailError = document.getElementById('emailError') as HTMLFormElement;
    manager.checkEmail(email, emailError);

    const passwordError = document.getElementById('passwordError') as HTMLFormElement;
    const password: string = formElement.password.value;
    manager.checkPassword(password, passwordError);
  };
};

export const submitUserData = async (event: Event): Promise<void> => {
  event.preventDefault();

  const email: string = (event.target as HTMLFormElement).email.value;
  const password: string = (event.target as HTMLFormElement).password.value;

  if (manager.isUserDataValid(email, password)) {
    await manager.signUpUser(email, password);
  }
};
