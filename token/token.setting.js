export class TokenSetting {
    saveToken(token){
        localStorage.setItem('token', token);
    }

    setExpireTime() {
        const oneMinuteInMs = 60000;
        const tenMinutes = oneMinuteInMs * 10;

        const tokenExpireTime = Date.now() + tenMinutes;
        localStorage.setItem('tokenExpireTime', tokenExpireTime);
    }

}