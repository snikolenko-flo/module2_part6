import { EXPIRATION_TIME } from '../data/constants.js';

export class TokenSetting {
  oneMinuteInMs: number;

  constructor() {
    this.oneMinuteInMs = 60000;
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  setExpireTime(): void {
    const tenMinutes = EXPIRATION_TIME * this.oneMinuteInMs;
    const tokenExpireTime: number = Date.now() + tenMinutes;
    localStorage.setItem('tokenExpireTime', tokenExpireTime.toString());
  }
}
