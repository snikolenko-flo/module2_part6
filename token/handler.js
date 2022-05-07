import { TokenManager } from "./token.manager.js";

const manager = new TokenManager();

export function checkToken() {
    manager.check.checkExpireTime();
    manager.check.checkTokenExists();
}

export function setToken(token) {
    manager.set.saveToken(token);
    manager.set.setExpireTime();
}