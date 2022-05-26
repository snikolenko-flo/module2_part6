import { TokenManager } from "./token.manager.js";

const manager = new TokenManager();

export function checkToken(): void {
  manager.check.checkExpireTime();
  manager.check.checkTokenExists();
}

export function setToken(token: string): void {
  manager.set.saveToken(token);
  manager.set.setExpireTime();
}
