import { validateUserInput, submitUserData } from "./handler.js";

const loginForm = document.getElementById('loginForm');

loginForm.onchange = validateUserInput(loginForm);
loginForm.onsubmit = submitUserData;