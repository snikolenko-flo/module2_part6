import { ONE_MINUTE } from "../data/constants.js";

export class TokenSetting {
    saveToken(token: string) {
        localStorage.setItem('token', token);
    }

    setExpireTime() {
        const tenMinutes: number = ONE_MINUTE * 10;
        const tokenExpireTime: number = Date.now() + tenMinutes;
        localStorage.setItem('tokenExpireTime', tokenExpireTime.toString());
    }

}