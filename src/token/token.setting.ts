import { ONE_MINUTE } from "../data/constants.js";

export class TokenSetting {
    saveToken(token: string): void {
        localStorage.setItem('token', token);
    }

    setExpireTime(): void {
        const tenMinutes: number = ONE_MINUTE * 10;
        const tokenExpireTime: number = Date.now() + tenMinutes;
        localStorage.setItem('tokenExpireTime', tokenExpireTime.toString());
    }

}