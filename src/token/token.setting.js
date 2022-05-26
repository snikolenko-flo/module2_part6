import { EXPIRATION_TIME } from '../data/constants.js';
export class TokenSetting {
    constructor() {
        this.oneMinuteInMs = 60000;
    }
    saveToken(token) {
        localStorage.setItem('token', token);
    }
    setExpireTime() {
        const tenMinutes = EXPIRATION_TIME * this.oneMinuteInMs;
        const tokenExpireTime = Date.now() + tenMinutes;
        localStorage.setItem('tokenExpireTime', tokenExpireTime.toString());
    }
}
