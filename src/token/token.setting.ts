export class TokenSetting {
    saveToken(token: string){
        localStorage.setItem('token', token);
    }

    setExpireTime() {
        const oneMinuteInMs: number = 60000;
        const tenMinutes: number = oneMinuteInMs * 10;

        const tokenExpireTime: number = Date.now() + tenMinutes;
        localStorage.setItem('tokenExpireTime', tokenExpireTime.toString());
    }

}